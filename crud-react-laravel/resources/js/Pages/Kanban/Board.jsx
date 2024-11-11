import React, { useEffect, useState } from "react";
import Column from "./Column";

const Board = ({ initialData }) => {
    const [backlogCards, setBacklogCards] = useState([]);
    const [todoCards, setTodoCards] = useState([]);
    const [doingCards, setDoingCards] = useState([]);
    const [doneCards, setDoneCards] = useState([]);

    useEffect(() => {
        const backlog = initialData.filter((card) => card.status === "backlog");
        const todo = initialData.filter((card) => card.status === "todo");
        const doing = initialData.filter(
            (card) => card.status === "in_progress"
        );
        const done = initialData.filter((card) => card.status === "completed");

        setBacklogCards(backlog);
        setTodoCards(todo);
        setDoingCards(doing);
        setDoneCards(done);
    }, [initialData]);

    return (
        <div className="flex w-full h-full gap-3 overflow-scroll p-12">
            <Column
                title="Backlog"
                column="backlog"
                headingColor="text-neutral-500"
                cards={backlogCards}
                setCards={setBacklogCards}
            />
            <Column
                title="TODO"
                column="todo"
                headingColor="text-yellow-200"
                cards={todoCards}
                setCards={setTodoCards}
            />
            <Column
                title="In progress"
                column="in_progress"
                headingColor="text-blue-200"
                cards={doingCards}
                setCards={setDoingCards}
            />
            <Column
                title="Complete"
                column="completed"
                headingColor="text-emerald-200"
                cards={doneCards}
                setCards={setDoneCards}
            />
        </div>
    );
};

export default Board;
