import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from 'react-bootstrap';
import { getAll, deleteTodo, createTodo } from '../services/services';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'középső'
    });
    const [formError, setFormError] = useState('');

    const loadTodos = async () => {
        try {
            const data = await getAll();
            setTodos(data);
        } catch (err) {
            setError("Nem sikerült betölteni a teendőket.");
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!formData.title.trim()) {
            setFormError('A cím kitöltése kötelező!');
            return;
        }
        if (formData.title.length > 255) {
            setFormError('A cím maximum 255 karakter lehet!');
            return;
        }

        try {
            await createTodo(formData);
            setFormData({ title: '', description: '', priority: 'középső' });
            loadTodos();
        } catch (err) {
            setFormError('Hiba történt a mentés során.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törlöd ezt a feladatot?")) {
            await deleteTodo(id);
            loadTodos();
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'felső': return 'danger';
            case 'középső': return 'warning';
            case 'alsó': return 'success';
            default: return 'secondary';
        }
    };

    return (
        <Container>
            <Card className="my-4 shadow-sm">
                <Card.Header as="h5">Új teendő hozzáadása</Card.Header>
                <Card.Body>
                    {formError && <Alert variant="danger">{formError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cím *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Mi a feladat?" 
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Leírás</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Részletek..." 
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Prioritás</Form.Label>
                                    <Form.Select 
                                        value={formData.priority}
                                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                    >
                                        <option value="alsó">alsó</option>
                                        <option value="középső">középső</option>
                                        <option value="felső">felső</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="success" type="submit">Hozzáadás</Button>
                    </Form>
                </Card.Body>
            </Card>

            <hr />

            <h2 className="my-4">Aktuális teendők</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {todos.map(todo => (
                    <Col key={todo.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-left-lg">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    {todo.title}
                                    <Badge bg={getPriorityColor(todo.priority)}>
                                        {todo.priority}
                                    </Badge>
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {todo.description || "Nincs leírás."}
                                </Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Törlés
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {todos.length === 0 && !error && <p className="text-center">Nincsenek teendők.</p>}
        </Container>
    );
};

export default TodoList;