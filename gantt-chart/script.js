/* ========================================
   SORT v2 Gantt Chart — Interactive Script
   ======================================== */

(function () {
    "use strict";

    /* ===== State ===== */
    let showCritical = false;
    let compactMode = false;
    let darkMode = false;
    const collapsedPhases = new Set();

    /* ===== Date Helper Functions ===== */
    function addDays(dateStr, days) {
        const date = new Date(dateStr + 'T00:00:00');
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    // Calculate sequential task dates (each task is 2 days, sequential order)
    function calculateSequentialDates() {
        const taskDates = {};
        const duration = 2; // 2 calendar days per task (day 1 and day 2)
        let currentStartDate = new Date(PROJECT.startDate + 'T00:00:00');

        console.log("Starting calculation from:", PROJECT.startDate);

        PHASES.forEach(phase => {
            console.log("Phase:", phase.name);
            phase.tasks.forEach(task => {
                if (task.milestone) {
                    // Milestone: same day as task start
                    const dateStr = currentStartDate.toISOString().split('T')[0];
                    taskDates[task.id] = {
                        start: dateStr,
                        end: dateStr,
                        duration: 0
                    };
                    console.log(`  Milestone ${task.id}: ${dateStr}`);
                } else {
                    // Regular task: starts today, ends tomorrow (2 calendar days)
                    const startStr = currentStartDate.toISOString().split('T')[0];
                    const endDate = new Date(currentStartDate);
                    endDate.setDate(endDate.getDate() + 1); // Add 1 day for the end
                    const endStr = endDate.toISOString().split('T')[0];

                    taskDates[task.id] = {
                        start: startStr,
                        end: endStr,
                        duration: duration
                    };
                    console.log(`  Task ${task.id}: ${startStr} to ${endStr}`);

                    // Move start date for next task (day after this task ends)
                    currentStartDate.setDate(currentStartDate.getDate() + 2); // Skip to 2 days ahead
                }
            });
        });

        console.log("All task dates:", taskDates);
        return taskDates;
    }

    let sequentialDates = null;

    function getSequentialTaskDates(taskId) {
        if (!sequentialDates) {
            console.log("Calculating dates for first time...");
            sequentialDates = calculateSequentialDates();
        }
        const result = sequentialDates[taskId] || { start: PROJECT.startDate, end: PROJECT.startDate, duration: 2 };
        if (!sequentialDates[taskId]) {
            console.log(`WARNING: Task ${taskId} not found in calculated dates!`);
        }
        return result;
    }

    function formatDateShort(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }

    /* ===== DOM Refs ===== */
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    let sidebarBody, timelineBody, timelineHeader, progressBar, progressText, progressStats, tooltip;

    /* ===== Init ===== */
    document.addEventListener("DOMContentLoaded", () => {
        // Initialize DOM refs after page loads
        sidebarBody = $("#sidebarBody");
        timelineBody = $("#timelineBody");
        timelineHeader = $("#timelineHeader");
        progressBar = $("#progressBar");
        progressText = $("#progressText");
        progressStats = $("#progressStats");
        tooltip = $("#tooltip");

        // Reset sequential dates cache
        sequentialDates = null;

        initTheme();
        initInfoCards();
        buildTimeline();
        buildChart();
        updateProgress();
        bindControls();
    });

    /* ===== Theme ===== */
    function initTheme() {
        const saved = localStorage.getItem("gantt-theme");
        if (saved === "dark") {
            darkMode = true;
            document.documentElement.setAttribute("data-theme", "dark");
            $("#toggleTheme .btn-icon").textContent = "☀️";
        }
    }

    function toggleTheme() {
        darkMode = !darkMode;
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "");
        localStorage.setItem("gantt-theme", darkMode ? "dark" : "light");
        $("#toggleTheme .btn-icon").textContent = darkMode ? "☀️" : "🌙";
    }

    /* ===== Info Cards Toggle ===== */
    function initInfoCards() {
        $$(".card-header").forEach((header) => {
            header.addEventListener("click", () => {
                const targetId = header.getAttribute("data-target");
                if (!targetId) return;
                const body = document.getElementById(targetId);
                if (!body) return;
                body.classList.toggle("collapsed");
                header.classList.toggle("collapsed");
            });
        });
    }

    /* ===== Timeline Header ===== */
    function buildTimeline() {
        timelineHeader.innerHTML = "";
        WEEK_LABELS.forEach((label, i) => {
            const cell = document.createElement("div");
            cell.className = "week-cell";
            cell.innerHTML = label.replace("\n", "<br>");
            // highlight current week (approximate)
            const now = new Date();
            const weekStart = new Date(PROJECT.startDate);
            weekStart.setDate(weekStart.getDate() + i * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);
            if (now >= weekStart && now < weekEnd) {
                cell.classList.add("current");
            }
            timelineHeader.appendChild(cell);
        });
    }

    /* ===== Flatten Tasks ===== */
    function getAllRows() {
        const rows = [];
        PHASES.forEach((phase) => {
            rows.push({ type: "phase", data: phase });
            phase.tasks.forEach((task) => {
                rows.push({ type: "task", data: task, phaseId: phase.id });
            });
        });
        return rows;
    }

    /* ===== Build Chart ===== */
    function buildChart() {
        sidebarBody.innerHTML = "";
        timelineBody.innerHTML = "";

        const rows = getAllRows();
        let rowIndex = 0;

        rows.forEach((row, i) => {
            const isPhase = row.type === "phase";
            const isHidden = !isPhase && collapsedPhases.has(row.phaseId);
            const parity = rowIndex % 2 === 0 ? "even" : "odd";

            // --- Sidebar Row ---
            const sRow = document.createElement("div");
            sRow.className = `sidebar-row ${isPhase ? "phase-row" : "task-row"} ${parity}`;
            if (isHidden) sRow.classList.add("hidden");
            if (isPhase) sRow.setAttribute("data-phase-id", row.data.id);

            if (isPhase) {
                const collapsed = collapsedPhases.has(row.data.id);
                sRow.innerHTML = `
          <div class="sr-task">
            <span class="phase-icon">${row.data.icon}</span>
            <span>${row.data.name}</span>
            <span class="phase-toggle ${collapsed ? "collapsed" : ""}">▾</span>
          </div>
          <div class="sr-assignee"></div>
          <div class="sr-start"></div>
          <div class="sr-end"></div>
          <div class="sr-duration"></div>
        `;
                sRow.addEventListener("click", () => togglePhase(row.data.id));
            } else {
                const t = row.data;
                const assigneeNames = t.assignee.map((k) => PROJECT.team[k].split(" ").slice(-1)[0]).join(", ");
                const dotColor = PHASE_COLORS[t.phase];
                const taskDates = getSequentialTaskDates(t.id);
                const startDisplay = formatDateShort(taskDates.start);
                const endDisplay = formatDateShort(taskDates.end);
                const durationText = t.milestone ? "—" : `${taskDates.duration}d`;
                sRow.innerHTML = `
          <div class="sr-task">
            <span class="indent" style="width:16px"></span>
            <span class="status-dot" style="background:${dotColor}"></span>
            <span>${t.name}</span>
          </div>
          <div class="sr-assignee" title="${t.assignee.map((k) => PROJECT.team[k]).join(", ")}">${assigneeNames}</div>
          <div class="sr-start">${startDisplay}</div>
          <div class="sr-end">${endDisplay}</div>
          <div class="sr-duration">${durationText}</div>
        `;
            }
            sidebarBody.appendChild(sRow);

            // --- Timeline Row ---
            const tRow = document.createElement("div");
            tRow.className = `timeline-row ${isPhase ? "phase-row" : "task-row"} ${parity}`;
            if (isHidden) tRow.classList.add("hidden");

            // Add week cells
            for (let w = 0; w < PROJECT.totalWeeks; w++) {
                const cell = document.createElement("div");
                cell.className = "timeline-cell";
                tRow.appendChild(cell);
            }

            // Add bar or milestone
            if (!isPhase) {
                const t = row.data;
                if (t.milestone) {
                    const marker = document.createElement("div");
                    marker.className = "milestone-marker";
                    const cellW = compactMode ? 80 : 110;
                    const left = (t.startWeek - 1) * cellW + cellW / 2;
                    marker.style.left = left + "px";
                    marker.addEventListener("mouseenter", (e) => showTooltip(e, t));
                    marker.addEventListener("mouseleave", hideTooltip);
                    marker.addEventListener("mousemove", moveTooltip);
                    tRow.appendChild(marker);
                } else {
                    const bar = document.createElement("div");
                    bar.className = "gantt-bar";
                    if (t.critical && showCritical) bar.classList.add("critical");
                    const cellW = compactMode ? 80 : 110;
                    const left = (t.startWeek - 1) * cellW + 4;
                    const width = t.duration * cellW - 8;
                    bar.style.left = left + "px";
                    bar.style.width = Math.max(width, 20) + "px";
                    bar.style.background = PHASE_COLORS[t.phase];
                    bar.style.animationDelay = (i * 0.03) + "s";

                    // Show short label if bar is wide enough
                    if (width > 80) {
                        const shortName = t.name.length > 18 ? t.name.substring(0, 16) + "…" : t.name;
                        bar.textContent = shortName;
                    }

                    bar.addEventListener("mouseenter", (e) => showTooltip(e, t));
                    bar.addEventListener("mouseleave", hideTooltip);
                    bar.addEventListener("mousemove", moveTooltip);
                    tRow.appendChild(bar);
                }
            }

            timelineBody.appendChild(tRow);

            if (!isPhase) rowIndex++;
        });

        // Sync scrolling between sidebar and timeline
        const timeline = $("#ganttTimeline");
        const sidebarWrap = sidebarBody;
        timeline.addEventListener("scroll", () => {
            sidebarWrap.scrollTop = timeline.scrollTop;
        });
        sidebarWrap.addEventListener("scroll", () => {
            timeline.scrollTop = sidebarWrap.scrollTop;
        });
    }

    /* ===== Phase Toggle ===== */
    function togglePhase(phaseId) {
        if (collapsedPhases.has(phaseId)) {
            collapsedPhases.delete(phaseId);
        } else {
            collapsedPhases.add(phaseId);
        }
        buildChart();
    }

    /* ===== Tooltip ===== */
    function showTooltip(e, task) {
        const assignees = task.assignee.map((k) => PROJECT.team[k]).join(", ");
        const durationStr = task.milestone
            ? "Milestone"
            : task.duration < 1
                ? `${Math.round(task.duration * 7)} days`
                : `${task.duration} week${task.duration > 1 ? "s" : ""}`;
        const deps = task.depends.length > 0 ? task.depends.join(", ") : "None";

        tooltip.innerHTML = `
      <div class="tooltip-title">${task.name}</div>
      <div class="tooltip-row"><span class="tooltip-label">Week:</span><span class="tooltip-value">${task.startWeek}${!task.milestone && task.duration > 0 ? " – " + (task.startWeek + task.duration - 1) : ""}</span></div>
      <div class="tooltip-row"><span class="tooltip-label">Duration:</span><span class="tooltip-value">${durationStr}</span></div>
      <div class="tooltip-row"><span class="tooltip-label">Assigned:</span><span class="tooltip-value">${assignees}</span></div>
      <div class="tooltip-row"><span class="tooltip-label">Phase:</span><span class="tooltip-value" style="color:${PHASE_COLORS[task.phase]}">${task.phase.charAt(0).toUpperCase() + task.phase.slice(1)}</span></div>
      <div class="tooltip-row"><span class="tooltip-label">Critical:</span><span class="tooltip-value">${task.critical ? "⚡ Yes" : "No"}</span></div>
      <div class="tooltip-row"><span class="tooltip-label">Depends on:</span><span class="tooltip-value">${deps}</span></div>
      ${task.deliverable ? `<div style="margin-top:8px;font-size:.75rem;color:#94a3b8;border-top:1px solid rgba(255,255,255,.1);padding-top:6px"><strong>Deliverable:</strong> ${task.deliverable}</div>` : ""}
    `;
        tooltip.classList.add("visible");
        moveTooltip(e);
    }

    function moveTooltip(e) {
        const pad = 12;
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        const rect = tooltip.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - pad) x = e.clientX - rect.width - pad;
        if (y + rect.height > window.innerHeight - pad) y = e.clientY - rect.height - pad;
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
    }

    function hideTooltip() {
        tooltip.classList.remove("visible");
    }

    /* ===== Progress Bar ===== */
    function updateProgress() {
        let total = 0;
        let completed = 0;
        const phaseCounts = {};

        PHASES.forEach((phase) => {
            phaseCounts[phase.id] = { total: 0, tasks: phase.tasks.length };
            phase.tasks.forEach((t) => {
                if (!t.milestone) {
                    total++;
                    // Simulate progress based on current date vs project timeline
                    const now = new Date();
                    const projStart = new Date(PROJECT.startDate);
                    const taskEndWeek = t.startWeek + t.duration;
                    const taskEndDate = new Date(projStart);
                    taskEndDate.setDate(taskEndDate.getDate() + taskEndWeek * 7);
                    if (now >= taskEndDate) {
                        completed++;
                        phaseCounts[phase.id].total++;
                    }
                }
            });
        });

        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        progressBar.style.width = Math.max(pct, 3) + "%";
        progressText.textContent = pct + "%";

        progressStats.innerHTML = `
      <span class="stat-item">📦 Total Tasks: <span class="stat-value">${total}</span></span>
      <span class="stat-item">✅ Completed: <span class="stat-value">${completed}</span></span>
      <span class="stat-item">⏳ Remaining: <span class="stat-value">${total - completed}</span></span>
      <span class="stat-item">📅 Weeks: <span class="stat-value">${PROJECT.totalWeeks}</span></span>
      <span class="stat-item">👥 Team: <span class="stat-value">4 members</span></span>
      <span class="stat-item">⚡ Critical Tasks: <span class="stat-value">${countCritical()}</span></span>
    `;
    }

    function countCritical() {
        let count = 0;
        PHASES.forEach((p) => p.tasks.forEach((t) => { if (t.critical && !t.milestone) count++; }));
        return count;
    }

    /* ===== Controls ===== */
    function bindControls() {
        // Critical Path Toggle
        $("#toggleCritical").addEventListener("click", function () {
            showCritical = !showCritical;
            this.classList.toggle("active", showCritical);
            buildChart();
        });

        // Compact/Full Toggle
        $("#toggleView").addEventListener("click", function () {
            compactMode = !compactMode;
            document.body.classList.toggle("compact", compactMode);
            $("#viewLabel").textContent = compactMode ? "Full" : "Compact";
            buildTimeline();
            buildChart();
        });

        // Theme Toggle
        $("#toggleTheme").addEventListener("click", toggleTheme);
    }
})();
