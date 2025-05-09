import { useState, useRef, useEffect } from "react";

export default function Instructions() {
    return (
        <>
            <div className="flex flex-col items-center font-[Montserrat] text-white justify-center h-fit backdrop-blur-md py-4">
                <p className="text-2xl p-4">Instructions</p>
            <ul className="list-disc text-md space-y-2 px-14">
                <li><strong>Choose a Topic:</strong> Select a subject you are passionate about and that resonates with your audience.</li>
                <li><strong>Do Research:</strong> Gather relevant information, statistics, and examples to make your blog insightful.</li>
                <li><strong>Write an Engaging Introduction:</strong> Hook readers with an interesting start, posing a question or stating a fact.</li>
                <li><strong>Organize Content:</strong> Use headings, subheadings, and bullet points to structure your post clearly.</li>
                <li><strong>Use Simple and Clear Language:</strong> Avoid jargon and make your writing accessible to a broad audience.</li>
                <li><strong>Add Visuals:</strong> Enhance your blog with images, infographics, or videos to make it visually appealing.</li>
                <li><strong>Proofread and Edit:</strong> Check for grammar, clarity, and coherence before publishing.</li>
                <li><strong>Include a Call to Action:</strong> Encourage readers to comment, share, or explore more content.</li>
            </ul>
            </div>
        </>
    );
}
