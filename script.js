// Код арқылы тіркелу & Авторизация логикасы
const ADMIN_HIERARCHY = [
    "Ст. Модератор", "Администратор", "Ст. Администратор", 
    "ГС/ЗГС", "Куратор Администраций", "Технический Специалист", 
    "Зам. Главного Администратора", "Главный Администратор", 
    "Зам. Основателя", "Основатель"
];

function registerUser(name, code) {
    let role = "Игрок";
    let isOwner = false;

    if (code === "BFGR183") {
        role = "Основатель";
        isOwner = true;
        alert("Арнайы код қабылданды! Сізге 'Основатель' құқығы берілді.");
    } else {
        alert("Сәтті тіркелдіңіз! Статус: Игрок");
    }

    const userData = {
        name: name,
        role: role,
        isOwner: isOwner
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    window.location.href = "profil.html";
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}

// Тақырыптарды сақтау/жүктеу
function getTopics(section) {
    let allTopics = JSON.parse(localStorage.getItem('forum_topics')) || [];
    return allTopics.filter(t => t.section === section);
}

function addTopic(section, title, prefix) {
    const user = getCurrentUser();
    if (!user) {
        alert("Алдымен тіркеліңіз!");
        return;
    }

    let allTopics = JSON.parse(localStorage.getItem('forum_topics')) || [];
    
    const newTopic = {
        id: Date.now(),
        section: section,
        title: title,
        author: user.name,
        prefix: user.isOwner ? prefix : user.role,
        status: 'Открыто'
    };

    allTopics.push(newTopic);
    localStorage.setItem('forum_topics', JSON.stringify(allTopics));
    location.reload();
}

function closeTopic(id) {
    let allTopics = JSON.parse(localStorage.getItem('forum_topics')) || [];
    let topic = allTopics.find(t => t.id === id);
    if (topic) {
        topic.status = 'Закрыто';
        localStorage.setItem('forum_topics', JSON.stringify(allTopics));
        location.reload();
    }
}

function deleteTopic(id) {
    if (confirm("Тақырыпты өшіргіңіз келе ме?")) {
        let allTopics = JSON.parse(localStorage.getItem('forum_topics')) || [];
        allTopics = allTopics.filter(t => t.id !== id);
        localStorage.setItem('forum_topics', JSON.stringify(allTopics));
        location.reload();
    }
}
