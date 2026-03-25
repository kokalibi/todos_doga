const API_URL = "http://localhost:8080/api/todos";

export const getAll = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Hiba a lekérés során');
        return await response.json(); 
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Nem található');
    return await response.json(); 
};

export const createTodo = async (ujTodo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ujTodo) 
    });
    return await response.json();
};

export const updateTodo = async (id, adatok) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adatok) 
    });
    return await response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE' 
    });
    return await response.json();
};