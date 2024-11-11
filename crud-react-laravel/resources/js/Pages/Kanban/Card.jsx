import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Delete as Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    Hash as ListOrdered,
    Code,
    Image as ImageIcon,
    Link as LinkIcon,
    Grid as TableIcon,
    Type,
    RotateCcw as Undo,
    RotateCw as Redo,
} from "react-feather";

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="border-b border-neutral-700 p-2 flex flex-wrap gap-1">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-skin-hover  ${
                    editor.isActive("bold") ? "bg-skin-hover " : ""
                }`}
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive("italic") ? "bg-skin-hover" : ""
                }`}
            >
                <Italic size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive("underline") ? "bg-skin-hover" : ""
                }`}
            >
                <UnderlineIcon size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive("strike") ? "bg-skin-hover" : ""
                }`}
            >
                <Strikethrough size={16} />
            </button>

            <div className="w-px h-6 bg-neutral-700  mx-1 self-center" />

            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive({ textAlign: "left" })
                        ? "bg-skin-hover"
                        : ""
                }`}
            >
                <AlignLeft size={16} />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive({ textAlign: "center" })
                        ? "bg-skin-hover"
                        : ""
                }`}
            >
                <AlignCenter size={16} />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive({ textAlign: "right" })
                        ? "bg-skin-hover"
                        : ""
                }`}
            >
                <AlignRight size={16} />
            </button>

            <div className="w-px h-6 bg-neutral-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive("bulletList") ? "bg-skin-hover" : ""
                }`}
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-skin-hover ${
                    editor.isActive("orderedList") ? "bg-skin-hover" : ""
                }`}
            >
                <ListOrdered size={16} />
            </button>

            <div className="w-px h-6 bg-neutral-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-skin-hover"
            >
                <Undo size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-skin-hover"
            >
                <Redo size={16} />
            </button>
        </div>
    );
};

const RichTextEditor = ({ content, onUpdate, onSave }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Superscript,
            Subscript,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            TextStyle,
            Color,
            Link,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-invert min-h-[200px] max-w-none p-4 focus:outline-none",
            },
            handleKeyDown: (view, event) => {
                if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                    onSave();
                    return true;
                }
            },
        },
    });

    return (
        <div className="border border-neutral-700 rounded-md">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <div className="px-4 py-2 text-xs text-neutral-400">
                Press Ctrl+Enter to save
            </div>
        </div>
    );
};
const Card = ({ title: initialTitle, id, initialColumn, onStatusChange }) => {
    const predefinedLabels = [
        { id: 1, name: "Frontend", color: "bg-blue-900 text-blue-200" },
        { id: 2, name: "Backend", color: "bg-green-900 text-green-200" },
        { id: 3, name: "Design", color: "bg-yellow-900 text-yellow-200" },
        { id: 4, name: "Bug", color: "bg-red-900 text-red-200" },
        { id: 4, name: "Enhancement", color: "bg-cyan-900 text-cyan-200" },
    ];

    const [activities, setActivities] = useState([
        {
            id: 1,
            type: "comment",
            user: "John Doe",
            avatar: "JD",
            content: "This needs to be reviewed by the team.",
            timestamp: new Date("2024-01-20T10:00:00"),
            reactions: [],
        },
        {
            id: 2,
            type: "status",
            user: "Sarah Smith",
            avatar: "SS",
            content: "changed status from TODO to IN PROGRESS",
            timestamp: new Date("2024-01-19T15:30:00"),
        },
    ]);

    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newActivity = {
                id: Date.now(),
                type: "comment",
                user: "ME", // Replace with actual user data
                avatar: "ME",
                content: newComment,
                timestamp: new Date(),
                reactions: [],
            };

            setActivities([newActivity, ...activities]);
            setNewComment("");
        }
    };

    const [selectedColor, setSelectedColor] = useState(
        "bg-purple-900 text-purple-200"
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [isAddingLabel, setIsAddingLabel] = useState(false);
    const [newLabelName, setNewLabelName] = useState("");
    const [labels, setLabels] = useState([]);
    const [openAccordions, setOpenAccordions] = useState({
        details: true,
        timeTracking: true,
        activity: true,
        labels: true,
    });

    const [column, setColumn] = useState(initialColumn || "todo");
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(
        "<p>Click to add a description...</p>"
    );
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const toggleAccordion = (accordionName) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [accordionName]: !prev[accordionName],
        }));
    };

    const columnStyles = {
        done: "bg-green-900 border-green-500",
        doing: "bg-blue-900 border-blue-500",
        todo: "bg-yellow-900 border-yellow-500",
        backlog: "bg-red-900 border-red-500",
    };

    const handleStatusChange = (newStatus) => {
        setColumn(newStatus);
        if (onStatusChange) {
            onStatusChange(id, newStatus);
        }
    };

    const handleAddLabel = () => {
        if (newLabelName.trim()) {
            const newLabel = {
                id: Date.now(),
                name: newLabelName.trim(),
                color: selectedColor,
            };
            setLabels([...labels, newLabel]);
            setNewLabelName("");
            setIsAddingLabel(false);
        }
    };

    return (
        <div>
            <div
                draggable="true"
                className="relative mt-2 cursor-grab rounded border border-neutral-700 dark:border-neutral-400 bg-skin-card text-skin-base p-3 active:cursor-grabbing"
                onClick={() => setIsDialogOpen(true)}
            >
                <p className="text-sm text-skin-base pe-4">{title}</p>
                <div className="flex flex-wrap gap-2 mt-3 mb-6">
                    {labels.map((label) => (
                        <span
                            key={label.id}
                            className={`px-2 py-1 text-xs rounded flex items-center gap-2 ${label.color}`}
                        >
                            {label.name}
                            <button
                                onClick={() =>
                                    setLabels(
                                        labels.filter((l) => l.id !== label.id)
                                    )
                                }
                                className="hover:text-white text-xs font-medium"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <span class="text-xs material-symbols-outlined">
                        calendar_month
                    </span>
                    <small>12-11-2024</small>
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-neutral-900 dark:bg-zinc-500"></div>
            </div>
            {isDialogOpen && (
                <div className="min-w-full min-h-screen fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center animate-fadeIn">
                    <div className="bg-skin-base rounded-lg p-6 h-4/5 w-4/5 flex flex-col animate-slideIn">
                        {/* Main Grid Container */}
                        <div className="grid grid-cols-3 gap-6 h-full overflow-hidden">
                            {/* Left Column - Main Content (2/3 width) */}
                            <div className="col-span-2 flex flex-col overflow-hidden">
                                {/* Title and Add button sections stay fixed */}
                                <div className="flex-shrink-0">
                                    <h2 className="text-lg text-skin-base mb-4 px-2 py-1 rounded cursor-text flex flex-col items-start">
                                        <div className="flex items-center justify-center mb-5">
                                            {/* <small
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const statuses = [
                                                        "done",
                                                        "doing",
                                                        "todo",
                                                        "backlog",
                                                    ];
                                                    const currentIndex =
                                                        statuses.indexOf(
                                                            column
                                                        );
                                                    const nextIndex =
                                                        (currentIndex + 1) %
                                                        statuses.length;
                                                    handleStatusChange(
                                                        statuses[nextIndex]
                                                    );
                                                }}
                                                className={` text-xs px-2 me-3 rounded-full border outline-none cursor-pointer hover:opacity-80 text-zinc-100 transition-colors ${
                                                    columnStyles[column] ||
                                                    "bg-gray-500 border-gray-700"
                                                }`}
                                            >
                                                {column}
                                            </small> */}

                                            <select
                                                onChange={(e) => {
                                                    const newStatus =
                                                        e.target.value;
                                                    handleStatusChange(
                                                        newStatus
                                                    );
                                                }}
                                                value={column}
                                                className={`text-xs px-2 me-3 rounded-full border outline-none cursor-pointer hover:opacity-80 text-zinc-100 transition-colors ${
                                                    columnStyles[column] ||
                                                    "bg-gray-500 border-gray-700"
                                                }`}
                                            >
                                                <option value="backlog">
                                                    Backlog
                                                </option>
                                                <option value="todo">
                                                    To Do
                                                </option>
                                                <option value="doing">
                                                    Doing
                                                </option>
                                                <option value="done">
                                                    Done
                                                </option>
                                            </select>

                                            <small className="text-xs text-skin-base">
                                                {" "}
                                                / JIRA-PROJECT
                                            </small>
                                        </div>

                                        {isEditingTitle ? (
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                                onBlur={() =>
                                                    setIsEditingTitle(false)
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    setIsEditingTitle(false)
                                                }
                                                className="text-lg text-skin-base bg-skin-base rounded focus:outline-none w-full"
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    setIsEditingTitle(true)
                                                }
                                            >
                                                {title}
                                            </span>
                                        )}
                                    </h2>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setShowAddMenu(!showAddMenu)
                                        }
                                        className="flex items-center gap-1 text-sm text-neutral-400 hover:text-skin-base  px-2 py-1 rounded hover:bg-skin-base"
                                    >
                                        <span>+</span>
                                        <span>Add</span>
                                    </button>

                                    {showAddMenu && (
                                        <div className="absolute left-0 mt-1 w-48 bg-skin-base rounded-md shadow-lg border border-neutral-700 z-10">
                                            <ul className="py-1">
                                                <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                                                    📎 Attachment
                                                </li>
                                                <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                                                    👶 Child Issue
                                                </li>
                                                <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                                                    👆 Parent Issue
                                                </li>
                                                <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                                                    🔗 Weblinks
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Scrollable content area */}
                                <div className="flex-1 overflow-y-auto pr-4 hide-scrollbar">
                                    <h6 className="px-2 text-sm mb-3">
                                        Description
                                    </h6>
                                    {isEditingDescription ? (
                                        <RichTextEditor
                                            content={description}
                                            onUpdate={(newContent) =>
                                                setDescription(newContent)
                                            }
                                            onSave={() =>
                                                setIsEditingDescription(false)
                                            }
                                        />
                                    ) : (
                                        <div
                                            className="text-sm text-neutral-400 px-2 py-1 rounded cursor-text prose prose-invert"
                                            onClick={() =>
                                                setIsEditingDescription(true)
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    )}

                                    {/* Activity Section */}
                                    <div className="mt-6 border-t border-neutral-700 pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h6 className="text-sm font-medium text-neutral-200">
                                                Comments
                                            </h6>
                                            <div className="flex gap-2">
                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                    Newest
                                                </button>
                                                <span className="text-neutral-600">
                                                    |
                                                </span>
                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                    Oldest
                                                </button>
                                            </div>
                                        </div>

                                        {/* Comment Input */}
                                        <div className="flex gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                                                ME
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    placeholder="Add a comment..."
                                                    className="w-full bg-skin-base rounded-t p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    rows="3"
                                                    value={newComment}
                                                    onChange={(e) =>
                                                        setNewComment(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === "Enter" &&
                                                            !e.shiftKey
                                                        ) {
                                                            e.preventDefault();
                                                            handleAddComment();
                                                        }
                                                    }}
                                                />
                                                <div className="rounded-b p-2 flex justify-end">
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
                                                        onClick={
                                                            handleAddComment
                                                        }
                                                    >
                                                        Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comments List */}
                                        <div className="space-y-4">
                                            {activities.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className="flex gap-3"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-skin-base  flex items-center justify-center text-sm border-neutral-800 dark:border-zinc-500 border">
                                                        {activity.avatar}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="bg-skin-base rounded p-3">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-sm">
                                                                    {
                                                                        activity.user
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-neutral-400">
                                                                    {new Date(
                                                                        activity.timestamp
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs ">
                                                                {
                                                                    activity.content
                                                                }
                                                            </p>
                                                            <div className="mt-2 flex gap-2">
                                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                                    Reply
                                                                </button>
                                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                                    Edit
                                                                </button>
                                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                                    Delete
                                                                </button>
                                                                <button className="text-xs text-neutral-400 hover:text-neutral-200">
                                                                    React
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Accordions (1/3 width) */}
                            <div className="col-span-1 border-l border-neutral-700 pl-6 overflow-auto hide-scrollbar">
                                {/* Details Accordion */}
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleAccordion("details")
                                        }
                                        className="w-full flex items-center justify-between p-2 hover:bg-skin-hover rounded"
                                    >
                                        <span className="text-sm font-medium text-skin-base">
                                            Details
                                        </span>
                                        <span>
                                            {openAccordions.details ? (
                                                <span class="material-symbols-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            ) : (
                                                <span class="material-symbols-outlined text-sm">
                                                    arrow_forward_ios
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                    {openAccordions.details && (
                                        <div className="p-2 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-skin-base">
                                                    Assignee
                                                </span>
                                                <span className="text-skin-base">
                                                    Unassigned
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-skin-base">
                                                    Priority
                                                </span>
                                                <span className="text-skin-base">
                                                    Medium
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-skin-base">
                                                    Due Date
                                                </span>
                                                <span className="text-skin-base">
                                                    Not set
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Time Tracking Accordion */}
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleAccordion("timeTracking")
                                        }
                                        className="w-full flex items-center justify-between p-2 hover:bg-skin-hover rounded"
                                    >
                                        <span className="text-sm font-medium text-skin-base">
                                            Time Tracking
                                        </span>
                                        <span>
                                            {openAccordions.timeTracking ? (
                                                <span class="material-symbols-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            ) : (
                                                <span class="material-symbols-outlined text-sm">
                                                    arrow_forward_ios
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                    {openAccordions.timeTracking && (
                                        <div className="p-2">
                                            <div className="bg-neutral-700 h-2 rounded-full">
                                                <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs text-skin-base">
                                                <span>4h logged</span>
                                                <span>8h estimated</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Activity Accordion */}
                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleAccordion("activity")
                                        }
                                        className="w-full flex items-center justify-between p-2 hover:bg-skin-hover rounded"
                                    >
                                        <span className="text-sm font-medium text-skin-base">
                                            Activity
                                        </span>
                                        <span>
                                            {openAccordions.activity ? (
                                                <span class="material-symbols-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            ) : (
                                                <span class="material-symbols-outlined text-sm">
                                                    arrow_forward_ios
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                    {openAccordions.activity && (
                                        <div className="p-2 space-y-3">
                                            <div className="text-sm">
                                                <div className="flex items-center text-neutral-400">
                                                    <span className="w-8 h-8 rounded-full bg-neutral-700 mr-2"></span>
                                                    <span>
                                                        John updated status
                                                    </span>
                                                </div>
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    2 hours ago
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Labels Accordion */}

                                <div className="mb-4">
                                    <button
                                        onClick={() =>
                                            toggleAccordion("labels")
                                        }
                                        className="w-full flex items-center justify-between p-2 hover:bg-skin-hover rounded"
                                    >
                                        <span className="text-sm font-medium text-skin-base">
                                            Labels
                                        </span>
                                        <span>
                                            {openAccordions.labels ? (
                                                <span className="material-symbols-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            ) : (
                                                <span className="material-symbols-outlined text-sm">
                                                    arrow_forward_ios
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                    {openAccordions.labels && (
                                        <div className="p-2">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {labels.map((label) => (
                                                    <span
                                                        key={label.id}
                                                        className={`px-2 py-1 text-xs rounded flex items-center gap-2 ${label.color}`}
                                                    >
                                                        {label.name}
                                                        <button
                                                            onClick={() =>
                                                                setLabels(
                                                                    labels.filter(
                                                                        (l) =>
                                                                            l.id !==
                                                                            label.id
                                                                    )
                                                                )
                                                            }
                                                            className="hover:text-white text-xs font-medium"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>

                                            {isAddingLabel ? (
                                                <div className="mt-2 p-3 bg-skin-base rounded-md">
                                                    <div className="flex flex-wrap gap-2">
                                                        {predefinedLabels.map(
                                                            (label) => {
                                                                // Check if the label is already selected
                                                                const isSelected =
                                                                    labels.some(
                                                                        (l) =>
                                                                            l.id ===
                                                                            label.id
                                                                    );

                                                                return (
                                                                    <button
                                                                        key={
                                                                            label.id
                                                                        }
                                                                        onClick={() => {
                                                                            if (
                                                                                isSelected
                                                                            ) {
                                                                                // Remove the selected label if it's already in the list
                                                                                setLabels(
                                                                                    (
                                                                                        prevLabels
                                                                                    ) =>
                                                                                        prevLabels.filter(
                                                                                            (
                                                                                                l
                                                                                            ) =>
                                                                                                l.id !==
                                                                                                label.id
                                                                                        )
                                                                                );
                                                                            } else {
                                                                                // Add the new label without affecting other selected labels
                                                                                setLabels(
                                                                                    (
                                                                                        prevLabels
                                                                                    ) => [
                                                                                        ...prevLabels,
                                                                                        label,
                                                                                    ]
                                                                                );
                                                                            }
                                                                        }}
                                                                        className={`px-2 py-1 text-xs rounded ${
                                                                            label.color
                                                                        } ${
                                                                            isSelected
                                                                                ? "ring-2 ring-white"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        {
                                                                            label.name
                                                                        }
                                                                    </button>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setIsAddingLabel(true)
                                                    }
                                                    className="w-full px-2 py-1 text-xs rounded border border-dashed border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-300"
                                                >
                                                    + Add Label
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Footer stays fixed at bottom */}
                        <div className="flex-shrink-0 mt-4 pt-4 border-t border-neutral-700">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Card;
