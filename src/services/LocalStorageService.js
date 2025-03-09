class LocalStorageService {
    // Claves para identificar cada tipo de dato en localStorage
    static DAUGHTERS_KEY = "daughters";
    static TASKS_KEY = "tasks";
    static ACHIEVEMENTS_KEY = "achievements";

    /* MÉTODOS PARA HIJAS */
    static getDaughters() {
        const data = localStorage.getItem(this.DAUGHTERS_KEY);
        if (!data) return [];
        return JSON.parse(data);
    }

    static saveDaughters(daughters) {
        // Almacena el arreglo de objetos Daughter (se usará el método toJSON de cada uno)
        localStorage.setItem(this.DAUGHTERS_KEY, JSON.stringify(daughters));
    }

    static addDaughter(daughterName) {
        const daughters = this.getDaughters();
        // Aquí puedes verificar si ya existe una hija con el mismo nombre
        if (!daughters.find(d => d.name === daughterName)) {
            daughters.push(daughterName);
            this.saveDaughters(daughters);
        }
    }

    static removeDaughter(daughterName) {
        let daughters = this.getDaughters();
        // Comparar por nombre, que es único
        daughters = daughters.filter(d => d.name !== daughterName);
        this.saveDaughters(daughters);
    }

    /* MÉTODOS PARA TAREAS */

    // Obtiene la lista de tareas (si no existe, retorna un arreglo vacío)
    static getTasks() {
        const data = localStorage.getItem(this.TASKS_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Guarda la lista completa de tareas en localStorage
    static saveTasks(tasks) {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }

    // Agrega una nueva tarea a la lista
    static addTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);
        this.saveTasks(tasks);
    }

    // Actualiza una tarea existente (identificada por su id)
    static updateTask(taskId, updatedTask) {
        let tasks = this.getTasks();
        tasks = tasks.map(task => task.id === taskId ? updatedTask : task);
        this.saveTasks(tasks);
    }

    // Elimina una tarea a partir de su id
    static removeTask(taskId) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        this.saveTasks(tasks);
    }

    // Obtiene las tareas asignadas a una hija específica
    static getTasksByDaughter(daughterName) {
        const tasks = this.getTasks();
        return tasks.filter(task => task.daughter === daughterName);
    }

    /* MÉTODOS PARA LOGROS */
    static getAchievements() {
        const data = localStorage.getItem(this.ACHIEVEMENTS_KEY);
        return data ? JSON.parse(data) : {};
    }

    static saveAchievements(achievements) {
        localStorage.setItem(this.ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    }

    static getAchievementsByDaughter(daughterName) {
        const achievements = this.getAchievements();
        return achievements[daughterName] || [];
    }

    static addAchievement(daughterName, achievement) {
        const achievements = this.getAchievements();
        if (!achievements[daughterName]) {
            achievements[daughterName] = [];
        }
        if (!achievements[daughterName].includes(achievement)) {
            achievements[daughterName].push(achievement);
            this.saveAchievements(achievements);
        }
    }

    static removeAchievement(daughterName, achievement) {
        const achievements = this.getAchievements();
        if (achievements[daughterName]) {
            achievements[daughterName] = achievements[daughterName].filter(a => a !== achievement);
            this.saveAchievements(achievements);
        }
    }
}

export default LocalStorageService;
