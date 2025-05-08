import { useState, useRef, useEffect } from "react";
import authorPfp from "../../assets/abhijeet.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const availableTags = [
    "News",
    "Upcoming Events",
    "Astrophysics",
    "Exoplanets",
    "Technology",
    "Missions"
];

export default function PreviewBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [readTime, setReadTime] = useState(0);
    const [file, setFile] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    useEffect(() => {
        const words = content.trim().split(/\s+/).length; 
        setReadTime(Math.ceil(words / 150) || 0);
    }, [content]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type.startsWith("image/")) {
                setFile(URL.createObjectURL(selectedFile));
            } else {
                alert("Only image files are allowed.");
            }
        }
    };

    const handleDelete = () => {
        setFile(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setFile(URL.createObjectURL(droppedFile));
            } else {
                alert("Only image files are allowed.");
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) 
                ? prevTags.filter((t) => t !== tag) 
                : [...prevTags, tag]
        );
    };

    return (
        <div className="submit-container flex w-full p-4 px-8 pb-8 font-[Montserrat] text-sm">
            <div className="blog-card w-full rounded-xl overflow-hidden shadow-lg p-1">
                
                {!file ? (
                    <div 
                        className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-purple-800/70 rounded-lg cursor-pointer hover:border-gray-400 transition p-4"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={handleClick}
                    >
                        <span className="block text-white text-lg font-semibold">Drag & Drop or Click to Upload</span>
                        <span className="text-white text-sm">Only image files are allowed</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <img src={file} alt="Uploaded Preview" className="w-full h-48 object-cover rounded-lg" />
                        <button
                            onClick={handleDelete}
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded-lg hover:bg-red-700 transition"
                        >
                            ✖
                        </button>
                    </div>
                )}

                <div className="p-4">
                    <p className="text-gray-400 text-sm"> {new Date().toDateString()} • {readTime} min</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-3xl font-semibold mt-4 bg-transparent text-white w-full focus:outline-none"
                        placeholder="Click and enter title"
                    />
                    <ReactQuill className="mt-4 text-white" theme="snow" value={content} onChange={setContent} />
                    
                    <div className="mt-6">
                        <p className="text-gray-300 text-sm mb-2">Select Tags:</p>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map((tag) => (
                                <button 
                                    key={tag} 
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-lg text-sm transition border ${selectedTags.includes(tag) ? "bg-purple-700/70 text-white" : "border-gray-500 text-gray-300"}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="details flex items-center justify-between mt-6">
                        <div className="author flex items-center">
                            <img
                                src={authorPfp}
                                className="author-pfp w-12 h-12 rounded-full outline outline-2 outline-purple-600"
                                alt="Author"
                            />
                            <p className="author-name m-2 text-gray-200 w-16">Abhijeet Srivastava</p>
                        </div>
                        <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
