import { useState } from "react";

interface AccordionItem {
  title: string;
  content: JSX.Element;
}

const accordionData: AccordionItem[] = [
    {
      title: "How to write a blog?",
      content: (
        <>
          <p className="mb-2 text-purple-500 dark:text-purple-400">
            Start by choosing a topic that interests you. Keep it simple and focus on sharing useful information or a personal experience.
          </p>
          <p className="text-purple-500 dark:text-purple-400">
            Write in a friendly and natural way, like you’re talking to a friend. Use short paragraphs to make it easy to read.
          </p>
        </>
      ),
    },
    {
      title: "What is the character limit for a blog?",
      content: (
        <>
          <p className="mb-2 text-purple-500 dark:text-purple-400">
            Your blog should be at least 500 words to cover your topic well. Avoid making it too long—around 2000 words is a good limit.
          </p>
          <p className="text-purple-500 dark:text-purple-400">
            If your blog is short, make sure it still provides value. If it’s long, break it into sections so it’s easy to follow.
          </p>
        </>
      ),
    },
    {
      title: "Do's and Don'ts for a good blog",
      content: (
        <>
          <p className="mb-2 text-purple-500 dark:text-purple-400 font-semibold">Do’s:</p>
          <ul className="list-disc pl-5 text-purple-500 dark:text-purple-400">
            <li>Write in simple and clear language.</li>
            <li>Use short sentences and paragraphs.</li>
            <li>Add examples or personal stories to make it interesting.</li>
            <li>Use headings to organize your content.</li>
          </ul>
          <p className="mb-2 text-purple-500 dark:text-purple-400 font-semibold mt-3">Don’ts:</p>
          <ul className="list-disc pl-5 text-purple-500 dark:text-purple-400">
            <li>Don’t copy from other websites.</li>
            <li>Don’t use difficult words or long, confusing sentences.</li>
            <li>Don’t make it too long without a clear structure.</li>
          </ul>
        </>
      ),
    },
    {
      title: "How long does blog approval take?",
      content: (
        <>
          <p className="mb-2 text-purple-500 dark:text-purple-400">
            After submitting your blog, it usually takes 2-3 days for approval.
          </p>
          <p className="text-purple-500 dark:text-purple-400">
            Make sure your blog follows the rules and doesn’t have mistakes to avoid delays.
          </p>
        </>
      ),
    },
  ];
  

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full font-[Montserrat] mx-auto bg-purple-800/15 p-6 rounded-md shadow-lg">
      <div className="text-center mb-6">
        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs uppercase">FAQ</span>
        <h2 className="text-2xl font-semibold text-purple-700 mt-2">Frequently Asked Questions</h2>
      </div>
      {accordionData.map((item, index) => (
        <div key={index} className="mb-2 rounded-md overflow-hidden">
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-purple-500 border border-purple-200 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 dark:border-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800/40 gap-3 rounded-md transition-all duration-300"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.title}</span>
              <svg
                className={`w-3 h-3 shrink-0 transform transition-transform duration-300 rotate-180 ${openIndex === index ? 'rotate-0' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          {openIndex === index && (
            <div className="p-5 border border-purple-200 dark:border-purple-700 dark:bg-purple-900/50 rounded-md transition-all duration-300 opacity-100 scale-100">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;