import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiArrowLeft, FiBook, FiCode, FiLayers, FiCpu, FiDatabase, FiTerminal } from 'react-icons/fi';
import { SiJavascript, SiReact, SiPython, SiGo, SiRust, SiCplusplus, SiTypescript, SiPhp, SiRuby, SiSwift, SiKotlin, SiPostgresql, SiVuedotjs } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const notesData = {
  javascript: {
    name: 'JavaScript',
    icon: <SiJavascript />,
    color: 'text-yellow-400',
    description: 'The programming language of the Web. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.',
    sections: [
      {
        title: 'The Event Loop',
        content: 'JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.',
        code: `console.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nconsole.log('End');\n\n// Output:\n// Start\n// End\n// Timeout`
      },
      {
        title: 'Closures',
        content: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is creation, at function creation time.',
        code: `function makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\n\nconst add5 = makeAdder(5);\nconsole.log(add5(2)); // 7`
      },
      {
        title: 'Prototypal Inheritance',
        content: 'JavaScript is a prototype-based language. Objects can inherit properties and methods from other objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.',
        code: `const animal = {\n  eats: true\n};\nconst rabbit = {\n  jumps: true,\n  __proto__: animal\n};\n\nconsole.log(rabbit.eats); // true`
      }
    ]
  },
  react: {
    name: 'React',
    icon: <SiReact />,
    color: 'text-cyan-400',
    description: 'A JavaScript library for building user interfaces. React makes it painless to create interactive UIs.',
    sections: [
      {
        title: 'Virtual DOM',
        content: 'React creates an in-memory data structure cache, computes the resulting differences, and then updates the browser\'s displayed DOM efficiently. This process is called reconciliation. It enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state.',
        code: `// React updates only what's necessary`
      },
      {
        title: 'Hooks',
        content: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components. Hooks allow you to reuse stateful logic without changing your component hierarchy.',
        code: `import { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = \`You clicked \${count} times\`;\n  });\n}`
      }
    ]
  },
  python: {
    name: 'Python',
    icon: <SiPython />,
    color: 'text-blue-500',
    description: 'Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.',
    sections: [
      {
        title: 'Global Interpreter Lock (GIL)',
        content: 'The Python Global Interpreter Lock or GIL, in simple words, is a mutex (or a lock) that allows only one thread to hold the control of the Python interpreter. This means that only one thread can be in a state of execution at any point in time.',
        code: `# Threading in Python is limited by GIL for CPU-bound tasks`
      },
      {
        title: 'List Comprehensions',
        content: 'List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable.',
        code: `squares = [x**2 for x in range(10)]\n# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`
      }
    ]
  },
  go: {
    name: 'Go',
    icon: <SiGo />,
    color: 'text-cyan-300',
    description: 'Go is a statically typed, compiled programming language designed at Google. It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.',
    sections: [
      {
        title: 'Goroutines',
        content: 'A goroutine is a lightweight thread managed by the Go runtime. They are extremely cheap compared to OS threads.',
        code: `go f(x, y, z)`
      },
      {
        title: 'Channels',
        content: 'Channels are a typed conduit through which you can send and receive values with the channel operator, <-.',
        code: `ch <- v    // Send v to channel ch.\nv := <-ch  // Receive from ch, and assign value to v.`
      }
    ]
  },
  rust: {
    name: 'Rust',
    icon: <SiRust />,
    color: 'text-orange-500',
    description: 'Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.',
    sections: [
      {
        title: 'Ownership',
        content: 'Ownership is a set of rules that govern how a Rust program manages memory. If the rules are violated, the program will not compile.',
        code: `let s1 = String::from("hello");\nlet s2 = s1;\n// println!("{}, world!", s1); // Validation Error: s1 moved to s2`
      },
      {
        title: 'Borrowing',
        content: 'References allow you to refer to some value without taking ownership of it. We call having references as distinct from owning "borrowing".',
        code: `fn calculate_length(s: &String) -> usize {\n  s.len()\n}`
      }
    ]
  },
  sql: {
    name: 'SQL',
    icon: <SiPostgresql />,
    color: 'text-blue-300',
    description: 'Structured Query Language is a domain-specific language used in programming and designed for managing data held in a relational database management system.',
    sections: [
      {
        title: 'ACID Properties',
        content: 'ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps.',
        code: `-- Transaction example\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;`
      },
      {
        title: 'Indexing',
        content: 'Indexes are special lookup tables that the database search engine can use to speed up data retrieval. Simply put, an index is a pointer to data in a table.',
        code: `CREATE INDEX idx_lastname ON employees (lastname);`
      }
    ]
  },
  java: {
    name: 'Java',
    icon: <FaJava />,
    color: 'text-orange-600',
    description: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
    sections: [
      { title: 'JVM', content: 'Java Virtual Machine (JVM) is essentially a virtual computer that enables a computer to run Java programs as well as programs written in other languages that are also compiled to Java bytecode.', code: 'java MyClass' },
      { title: 'Garbage Collection', content: 'Java has automatic garbage collection, which is the process of looking at heap memory, identifying which objects are in use and which are not, and deleting the unused objects.', code: 'System.gc(); // Suggestion only' }
    ]
  },
  cpp: {
    name: 'C++',
    icon: <SiCplusplus />,
    color: 'text-blue-700',
    description: 'C++ is a high-level general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language.',
    sections: [
      { title: 'Pointers', content: 'A pointer is a variable whose value is the address of another variable, i.e., direct address of the memory location.', code: 'int *ip; // pointer to an integer' },
      { title: 'RAII', content: 'Resource Acquisition Is Initialization is a programming idiom used in C++ where resource allocation is tied to object lifetime.', code: 'std::lock_guard<std::mutex> lock(mutex);' }
    ]
  },
  typescript: {
    name: 'TypeScript',
    icon: <SiTypescript />,
    color: 'text-blue-600',
    description: 'TypeScript is a syntactic superset of JavaScript which adds static typing.',
    sections: [
      { title: 'Interfaces', content: 'One of TypeScript\'s core principles is that type checking focuses on the shape that values have. This is sometimes called "duck typing" or "structural subtyping".', code: 'interface Person {\n  firstName: string;\n  lastName: string;\n}' },
      { title: 'Generics', content: 'Generics provide a way to create reusable components. A component can work with a variety of types rather than a single one.', code: 'function identity<T>(arg: T): T {\n  return arg;\n}' }
    ]
  },
  vuejs: {
    name: 'Vue.js',
    icon: <SiVuedotjs />,
    color: 'text-green-500',
    description: 'Vue.js is a progressive framework for building user interfaces. It is designed to be incrementally adoptable.',
    sections: [
      {
        title: 'Reactivity',
        content: 'Vue uses a reactivity system that automatically tracks dependencies and updates the DOM when state changes. It uses proxies to detect property access and modification.',
        code: `import { reactive } from 'vue'\n\nconst state = reactive({ count: 0 })\nstate.count++ // DOM updates automatically`
      },
      {
        title: 'Directives',
        content: 'Directives are special attributes with the v- prefix. Directive attribute values are expected to be a single JavaScript expression.',
        code: `<p v-if="seen">Now you see me</p>\n<a v-bind:href="url">Link</a>`
      }
    ]
  },
  php: {
    name: 'PHP',
    icon: <SiPhp />,
    color: 'text-indigo-400',
    description: 'PHP is a popular general-purpose scripting language that is especially suited to web development.',
    sections: [
      {
        title: 'Associative Arrays',
        content: 'PHP arrays can be treated as an array (indexed) or a dictionary (associative keys).',
        code: `$data = array("first" => "John", "last" => "Doe");\necho $data["first"]; // John`
      },
      {
        title: 'Classes and Objects',
        content: 'PHP is a fully object-oriented language. Classes are blueprints for objects.',
        code: `class Car {\n  public $color;\n  public function __construct($color) {\n    this->color = $color;\n  }\n}`
      }
    ]
  },
  ruby: {
    name: 'Ruby',
    icon: <SiRuby />,
    color: 'text-red-500',
    description: 'Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.',
    sections: [
      {
        title: 'Blocks',
        content: 'Blocks are chunks of code enclosed between braces or do..end that can be passed to methods.',
        code: `5.times do |i|\n  puts "Hello #{i}"\nend`
      },
      {
        title: 'Symbols',
        content: 'Symbols are lightweight strings. They are used as unique identifiers and are more memory efficient than strings.',
        code: `status = :active\nuser = { :name => "Rob", :age => 25 }`
      }
    ]
  },
  swift: {
    name: 'Swift',
    icon: <SiSwift />,
    color: 'text-orange-500',
    description: 'Swift is a powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.',
    sections: [
      {
        title: 'Optionals',
        content: 'Optionals are a type that handles the absence of a value. They say either "there is a value, and it equals x" or "there isn\'t a value at all".',
        code: `var surveyAnswer: String?\n// surveyAnswer is automatically set to nil`
      },
      {
        title: 'Structs vs Classes',
        content: 'Structures are value types and are copied when passed around. Classes are reference types.',
        code: `struct Card {\n  var rank: Int\n  var suit: String\n}`
      }
    ]
  },
  kotlin: {
    name: 'Kotlin',
    icon: <SiKotlin />,
    color: 'text-purple-500',
    description: 'Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. It is completely interoperable with Java.',
    sections: [
      {
        title: 'Null Safety',
        content: 'Kotlin\'s type system is aimed at eliminating the danger of null references, also known as The Billion Dollar Mistake.',
        code: `var a: String = "abc" // Regular initialization means non-null by default\n// a = null // compilation error`
      },
      {
        title: 'Coroutines',
        content: 'Coroutines are a way to write asynchronous code sequentially. They are like light-weight threads.',
        code: `GlobalScope.launch {\n    delay(1000L)\n    println("World!")\n}`
      }
    ]
  }
};

const LanguageNotes = () => {
  const { id } = useParams();
  const langKey = id.toLowerCase().replace('c++', 'cpp').replace('.', '');
  
  const data = notesData[langKey] || notesData[langKey.split('-')[0]] || {
    name: id,
    icon: <FiCode />,
    color: 'text-white',
    description: 'Detailed notes coming soon for this language.',
    sections: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 px-4 sm:px-6 pb-20 w-full max-w-5xl mx-auto">
        <Link to="/languages" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-8 sm:mb-12 transition-all group text-xs sm:text-sm font-bold uppercase tracking-widest">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Languages
        </Link>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 mb-16 sm:mb-24 border-b border-white/5 pb-10 sm:pb-16 text-center sm:text-left">
          <div className={`p-6 sm:p-8 rounded-[2rem] bg-white/5 border border-white/10 ${data.color} text-5xl sm:text-7xl shadow-2xl shrink-0`}>
            {data.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl sm:text-7xl font-black mb-4 tracking-tighter leading-tight">
              {data.name} <span className="text-white/20 block sm:inline">Notes</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 leading-relaxed max-w-2xl font-medium">
              {data.description}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        {data.sections.length > 0 ? (
          <div className="relative space-y-20 sm:space-y-32">
            {/* Vertical connecting line */}
            <div className="absolute left-[24px] sm:left-[32px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

            {data.sections.map((section, index) => (
              <div key={index} className="relative group">
                <div className="flex items-start gap-4 sm:gap-10">
                  {/* Timeline Number */}
                  <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-mono font-black text-sm sm:text-lg text-white/20 shrink-0 group-hover:border-white/40 group-hover:text-white transition-all duration-500 shadow-2xl">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>

                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 sm:mb-6 group-hover:translate-x-1 transition-transform duration-500 tracking-tight">
                      {section.title}
                    </h2>

                    <p className="text-white/60 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed max-w-3xl font-medium">
                      {section.content}
                    </p>

                    {section.code && (
                      <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] group-hover:border-white/10 transition-all duration-500">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/5">
                          <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                          </div>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Code Example</span>
                        </div>

                        <div className="p-6 sm:p-8 overflow-x-auto no-scrollbar">
                          <pre className="font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/5 rounded-[2rem] p-12 sm:p-20 text-center">
            <FiTerminal className="mx-auto text-white/10 mb-8" size={64} />
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Documentation Pending</h3>
            <p className="text-white/30 max-w-md mx-auto font-medium">
              We're currently compiling the master notes for {data.name}. Check back soon for deep dives and patterns.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LanguageNotes;
