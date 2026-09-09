export default function handler(req, res) {
    const opportunities = [
        {
            title: "مولد وصف المنتجات",
            problem: "أصحاب المتاجر يحتاجون كتابة أوصاف للمنتجات بسرعة.",
            score: 82,
            difficulty: "سهلة"
        },
        {
            title: "حاسبة تكلفة الشحن",
            problem: "المستخدمون يحتاجون حساب تكلفة الشحن بسهولة.",
            score: 76,
            difficulty: "سهلة"
        },
        {
            title: "محول الملفات النصية",
            problem: "الحاجة إلى تحويل النصوص بين صيغ مختلفة.",
            score: 71,
            difficulty: "متوسطة"
        }
    ];

    res.status(200).json({
        success: true,
        count: opportunities.length,
        opportunities
    });
}
