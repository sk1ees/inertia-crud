import React, { useState } from "react";
import { router } from "@inertiajs/react";

const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length) return;

        // Temporarily add the card to the local state for a smooth UI update
        const newCard = {
            id: Date.now().toString(),
            title: text.trim(),
            status: column,
        };
        setCards((prev) => [...prev, newCard]);

        // Send the data to /kanban without expecting JSON response
        router.post(
            "/kanban",
            {
                title: text.trim(),
                status: column,
            },
            {
                onSuccess: () => {
                    setText(""); // Clear the input field
                    setAdding(false); // Close the form
                },
            }
        );
    };

    return (
        <>
            {adding ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full mt-2 rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-skin-base placeholder-violet-300 focus:outline-0"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50 dark:hover:text-neutral-900"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add +</span>
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50 dark:hover:text-neutral-900"
                >
                    <span>+ Add Task</span>
                </button>
            )}
        </>
    );
};

export default AddCard;
