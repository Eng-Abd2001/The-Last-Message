"use strict";

/*
    Money Hunter AI
    Core Dashboard V1
*/

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("page-title");
const refreshBtn = document.getElementById("refreshBtn");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const startSearchBtn = document.getElementById("startSearchBtn");

const titles = {
    dashboard: "لوحة التحكم",
    opportunities: "الفرص",
    projects: "المشاريع",
    activity: "النشاط"
};

/* -----------------------------
   Navigation
----------------------------- */

function openSection(sectionId) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    const targetSection = document.getElementById(sectionId);
    const targetNav = document.querySelector(
        `.nav-item[data-section="${sectionId}"]`
    );

    if (targetSection) {
        targetSection.classList.add("active");
    }

    if (targetNav) {
        targetNav.classList.add("active");
    }

    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const section = item.dataset.section;

        if (section) {
            openSection(section);
        }

    });

});


/* -----------------------------
   Internal navigation buttons
----------------------------- */

document.querySelectorAll("[data-section-target]").forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.sectionTarget;

        if (target) {
            openSection(target);
        }

    });

});


/* -----------------------------
   Refresh system
----------------------------- */

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

        refreshBtn.style.transform = "rotate(360deg)";

        setTimeout(() => {
            refreshBtn.style.transform = "";
        }, 500);

        showToast("تم تحديث حالة النظام");

    });

}


/* -----------------------------
   Future search button
----------------------------- */

if (startSearchBtn) {

    startSearchBtn.addEventListener("click", () => {

        showToast(
            "محرك اكتشاف الفرص سيُضاف في المرحلة الثانية"
        );

    });

}


/* -----------------------------
   Toast
----------------------------- */

let toastTimer;

function showToast(message) {

    if (!toast || !toastText) return;

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}


/* -----------------------------
   Initial system state
----------------------------- */

function initializeSystem() {

    const opportunities = 0;
    const projects = 0;
    const bestScore = "—";

    const opportunitiesElement =
        document.getElementById("opportunitiesCount");

    const projectsElement =
        document.getElementById("projectsCount");

    const bestScoreElement =
        document.getElementById("bestScore");

    if (opportunitiesElement) {
        opportunitiesElement.textContent = opportunities;
    }

    if (projectsElement) {
        projectsElement.textContent = projects;
    }

    if (bestScoreElement) {
        bestScoreElement.textContent = bestScore;
    }

}

initializeSystem();


/* -----------------------------
   Keyboard shortcut
----------------------------- */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        openSection("dashboard");
    }

});


/* -----------------------------
   Console information
----------------------------- */

console.log(
    "%cMoney Hunter AI V1",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Core dashboard initialized successfully."
);


async function loadOpportunities() {
    try {
        const response = await fetch("/api/opportunities");
        const data = await response.json();

        if (!data.success) return;

        console.log("الفرص المكتشفة:", data.opportunities);

    } catch (error) {
        console.error("فشل تحميل الفرص:", error);
    }
}

loadOpportunities();








async function displayOpportunities() {
    try {
        const response = await fetch("/api/opportunities");
        const data = await response.json();

        const container = document.getElementById("opportunitiesList");

        if (!container || !data.success) return;

        container.innerHTML = data.opportunities.map((opportunity, index) => `
            <div class="opportunity-card">
                <h3>${opportunity.title}</h3>

                <p>${opportunity.problem}</p>

                <div class="opportunity-score">
                    تقييم الفرصة: ${opportunity.score}/100
                </div>

                <button
                    class="analyze-btn"
                    onclick="analyzeOpportunity(${index})">
                    تحليل الفرصة
                </button>

                <div id="analysis-${index}" class="analysis-result"></div>
            </div>
        `).join("");

        window.currentOpportunities = data.opportunities;

    } catch (error) {
        console.error("فشل تحميل الفرص:", error);
    }
}

async function analyzeOpportunity(index) {
    const opportunity = window.currentOpportunities[index];
    const result = document.getElementById(`analysis-${index}`);

    if (!opportunity || !result) return;

    result.innerHTML = "⏳ جاري تحليل الفرصة...";

    await new Promise(resolve => setTimeout(resolve, 800));

    let decision = "متوسطة";
    let reason = "تحتاج إلى دراسة إضافية قبل التنفيذ.";

    if (opportunity.score >= 80) {
        decision = "قوية";
        reason = "يوجد اهتمام واضح بالمشكلة، ويمكن تحويلها إلى أداة رقمية بسيطة.";
    } else if (opportunity.score >= 70) {
        decision = "جيدة";
        reason = "الفرصة تستحق التجربة، لكن يجب اختبار الطلب قبل استثمار وقت كبير.";
    } else {
        decision = "ضعيفة";
        reason = "الإشارات الحالية لا تكفي لإعطائها أولوية عالية.";
    }

    result.innerHTML = `
        <div class="analysis-box">
            <strong>القرار: ${decision}</strong>
            <p>${reason}</p>
        </div>
    `;
}

displayOpportunities();