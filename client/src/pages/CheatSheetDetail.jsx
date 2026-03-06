import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CheatSheetDetail = () => {
  const { id } = useParams();
  const [copiedId, setCopiedId] = useState(null);

  const allCheatSheets = {
    nodejs: {
      title: "Node.js Cheat Sheet",
      desc: "Essential Node.js runtime commands and patterns.",
      version: "v20.x",
      sections: [
        {
          title: "Setup & Run",
          items: [
            { label: "Run script", code: "node app.js" },
            { label: "Run with watch", code: "node --watch app.js" },
            { label: "Check version", code: "node -v" },
            { label: "REPL mode", code: "node" }
          ]
        },
        {
          title: "Core Modules",
          items: [
            { label: "Import syntax (CJS)", code: "const fs = require('fs');" },
            { label: "Import syntax (ESM)", code: "import fs from 'fs';" },
            { label: "Path join", code: "path.join(__dirname, 'file.txt')" },
            { label: "Read file sync", code: "fs.readFileSync('file.txt', 'utf8')" }
          ]
        },
        {
          title: "Creating a Server",
          items: [
            {
              label: "Basic HTTP Server",
              code: `const http = require('node:http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World');\n});\n\nserver.listen(3000);`
            }
          ]
        },
        {
          title: "Express Basics",
          items: [
            { label: "Init App", code: "const app = express();" },
            { label: "Listen", code: "app.listen(3000, () => console.log('Running'));" },
            { label: "GET Route", code: "app.get('/', (req, res) => res.send('Hi'));" },
            { label: "POST Route", code: "app.post('/data', (req, res) => res.json(req.body));" }
          ]
        },
        {
          title: "Streams & Buffers (Intermediate)",
          items: [
            { label: "Pipe Stream", code: "fs.createReadStream('in.txt').pipe(res);" },
            { label: "Buffer alloc", code: "const buf = Buffer.alloc(10);" },
            { label: "Buffer from string", code: "const buf = Buffer.from('hello');" }
          ]
        },
        {
          title: "Concurrency & Performance (Advanced)",
          items: [
            { label: "Cluster Mode", code: "const cluster = require('cluster');\nif (cluster.isPrimary) {\n  cluster.fork();\n}" },
            { label: "Worker Threads", code: "const { Worker } = require('worker_threads');\nnew Worker('./worker.js');" },
            { label: "Increase Memory", code: "node --max-old-space-size=4096 app.js" },
            { label: "Event Loop", code: "process.nextTick(() => console.log('Priority'));" }
          ]
        }
      ]
    },
    git: {
      title: "Git Cheat Sheet",
      desc: "Essential Git commands for version control.",
      version: "v2.4x",
      sections: [
        {
          title: "Configuration",
          items: [
            { label: "Set Name", code: 'git config --global user.name "John Doe"' },
            { label: "Set Email", code: 'git config --global user.email "john@example.com"' },
            { label: "Show Config", code: "git config --list" }
          ]
        },
        {
          title: "Core Commands",
          items: [
            { label: "Initialize", code: "git init" },
            { label: "Clone Repo", code: "git clone <url>" },
            { label: "Check Status", code: "git status" },
            { label: "Add File", code: "git add file.txt" },
            { label: "Add All", code: "git add ." },
            { label: "Commit", code: 'git commit -m "Message"' }
          ]
        },
        {
          title: "Branching",
          items: [
            { label: "List Branches", code: "git branch" },
            { label: "New Branch", code: "git branch <name>" },
            { label: "Switch Branch", code: "git checkout <name>" },
            { label: "Create & Switch", code: "git checkout -b <name>" },
            { label: "Merge Branch", code: "git merge <name>" }
          ]
        },
        {
          title: "Remote & Sync",
          items: [
            { label: "Add Remote", code: "git remote add origin <url>" },
            { label: "Push", code: "git push origin main" },
            { label: "Pull", code: "git pull origin main" },
            { label: "Fetch", code: "git fetch" }
          ]
        }
      ]
    },
    react: {
      title: "React Cheat Sheet",
      desc: "Hooks, Components and Patterns for React.",
      version: "v19",
      sections: [
        {
          title: "Components",
          items: [
            { label: "Functional Component", code: "const Component = () => {\n  return <div>Hello</div>;\n};" },
            { label: "Props", code: "const Welcome = ({ name }) => <h1>Hello, {name}</h1>;" },
            { label: "Fragment", code: "<>\n  <Header />\n  <Footer />\n</>" }
          ]
        },
        {
          title: "Hooks",
          items: [
            { label: "useState", code: "const [count, setCount] = useState(0);" },
            { label: "useEffect", code: "useEffect(() => {\n  document.title = count;\n}, [count]);" },
            { label: "useContext", code: "const value = useContext(MyContext);" },
            { label: "useRef", code: "const inputRef = useRef(null);" }
          ]
        },
        {
          title: "Advanced Hooks & Patterns",
          items: [
            { label: "useReducer", code: "const [state, dispatch] = useReducer(reducer, initialState);" },
            { label: "useMemo", code: "const cached = useMemo(() => compute(a, b), [a, b]);" },
            { label: "useCallback", code: "const fn = useCallback(() => doSomething(a), [a]);" },
            { label: "Custom Hook", code: "const useWindowSize = () => {\n  const [size, setSize] = useState(...);\n  return size;\n};" }
          ]
        },
        {
          title: "Performance & Architecture (Advanced)",
          items: [
            { label: "React.memo", code: "const Memoized = React.memo(MyComponent);" },
            { label: "Lazy Load", code: "const OtherComponent = React.lazy(() => import('./OtherComponent'));" },
            { label: "Portals", code: "createPortal(<Modal />, document.body);" },
            { label: "Error Boundary", code: "static getDerivedStateFromError(error) {\n  return { hasError: true };\n}" }
          ]
        }
      ]
    },
    express: {
      title: "Express.js Cheat Sheet",
      desc: "Node.js web framework for building APIs and web applications.",
      version: "v5.0",
      sections: [
        {
          title: "Basic Routing",
          items: [
            { label: "Init", code: "const express = require('express')\nconst app = express()" },
            { label: "GET/POST", code: "app.get('/', (req, res) => res.send('GET'))\napp.post('/', (req, res) => res.json({ ok: true }))" },
            { label: "Route Params", code: "app.get('/user/:id', (req, res) => {\n  const id = req.params.id\n})" }
          ]
        },
        {
          title: "Middleware",
          items: [
            { label: "Application Level", code: "app.use((req, res, next) => {\n  console.log('Time:', Date.now())\n  next()\n})" },
            { label: "Built-in", code: "app.use(express.json())\napp.use(express.static('public'))" },
            { label: "Error Handling", code: "app.use((err, req, res, next) => {\n  console.error(err.stack)\n  res.status(500).send('Error!')\n})" }
          ]
        },
        {
          title: "Response Methods",
          items: [
            { label: "res.send()", code: "res.send('HTML or Text')" },
            { label: "res.json()", code: "res.json({ user: 'tobi' })" },
            { label: "res.redirect()", code: "res.redirect('/login')" },
            { label: "res.status()", code: "res.status(404).end()" }
          ]
        }
      ]
    },
    python: {
      title: "Python Cheat Sheet",
      desc: "Syntax reference for Python programming language.",
      version: "3.12",
      sections: [
        {
          title: "Basics",
          items: [
            { label: "Print", code: 'print("Hello World")' },
            { label: "Variables", code: "x = 5\ny = 'John'" },
            { label: "Type conversion", code: "str(10), int('10'), float(10)" }
          ]
        },
        {
          title: "Data Structures",
          items: [
            { label: "List", code: "fruits = ['apple', 'banana', 'cherry']" },
            { label: "Dict", code: "person = {'name': 'John', 'age': 30}" },
            { label: "Tuple", code: "coords = (10.0, 20.0)" }
          ]
        },
        {
          title: "Intermediate Python",
          items: [
            { label: "List Comprehension", code: "squares = [x**2 for x in range(10)]" },
            { label: "Lambda", code: "add = lambda x, y: x + y" },
            { label: "File I/O", code: "with open('file.txt', 'r') as f:\n    content = f.read()" },
            { label: "Exception Handling", code: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Error')" }
          ]
        },
        {
          title: "Advanced Concepts",
          items: [
            { label: "Decorators", code: "@my_decorator\ndef func():\n    pass" },
            { label: "Generators", code: "def gen():\n    yield 1\n    yield 2" },
            { label: "Context Manager", code: "class ManagedFile:\n    def __enter__(self): pass\n    def __exit__(self, *args): pass" },
            { label: "AsyncIO", code: "import asyncio\nasync def main():\n    await asyncio.sleep(1)" }
          ]
        }
      ]
    },
    docker: {
      title: "Docker Cheat Sheet",
      desc: "Containerization platform for developing and running applications.",
      version: "v24+",
      sections: [
        {
          title: "Running Containers",
          items: [
            { label: "Run", code: "docker run -d --name my-app -p 8080:80 nginx" },
            { label: "Stop & Start", code: "docker stop my-app\ndocker start my-app" },
            { label: "Exec", code: "docker exec -it my-app /bin/bash" },
            { label: "Logs", code: "docker logs -f my-app" }
          ]
        },
        {
          title: "Images",
          items: [
            { label: "Build", code: "docker build -t app:v1 ." },
            { label: "List & Prune", code: "docker images\ndocker image prune" },
            { label: "Push", code: "docker push registry.com/app:v1" }
          ]
        },
        {
          title: "Dockerfile Instructions",
          items: [
            { label: "FROM & RUN", code: "FROM node:20\nRUN npm install" },
            { label: "COPY & ADD", code: "COPY . /app\nADD project.tar.gz /data" },
            { label: "CMD & ENTRYPOINT", code: "CMD [\"node\", \"server.js\"]\nENTRYPOINT [\"python\"]" }
          ]
        },
        {
          title: "Cleanup",
          items: [
            { label: "Remove", code: "docker rm -f container_id\ndocker rmi image_id" },
            { label: "Prune All", code: "docker system prune -a --volumes" }
          ]
        }
      ]
    },
    typescript: {
      title: "TypeScript Cheat Sheet",
      desc: "Static types, Interfaces, Generics, and Utility types for JavaScript scalability.",
      version: "v5.3",
      sections: [
        {
          title: "Basic Types",
          items: [
            { label: "Primitives", code: "let isDone: boolean = false\nlet count: number = 42\nlet name: string = 'John'\nlet list: number[] = [1, 2, 3]\nlet tuple: [string, number] = ['hello', 10]" },
            { label: "Enums", code: "enum Color { Red, Green, Blue }\nlet c: Color = Color.Green" },
            { label: "Union & Intersection", code: "type ID = string | number\ntype Admin = User & { permissions: string[] }" }
          ]
        },
        {
          title: "Interfaces & Types",
          items: [
            { label: "Interface", code: "interface User {\n  readonly id: number\n  name: string\n  age?: number // optional\n}" },
            { label: "Function Type", code: "interface SearchFunc {\n  (source: string, sub: string): boolean\n}" },
            { label: "Type Alias", code: "type Point = { x: number; y: number }" }
          ]
        },
        {
          title: "Generics",
          items: [
            { label: "Generic Function", code: "function identity<T>(arg: T): T {\n  return arg\n}" },
            { label: "Generic Interface", code: "interface Box<T> {\n  value: T\n}" }
          ]
        },
        {
          title: "Utility Types",
          items: [
            { label: "Common Utilities", code: "Partial<User> // all props optional\nReadonly<User> // all props readonly\nPick<User, 'name' | 'age'>\nOmit<User, 'id'>" }
          ]
        }
      ]
    },
    css: {
      title: "CSS Cheat Sheet",
      desc: "Style sheet language used for describing the presentation of a document.",
      version: "Lev 3",
      sections: [
        {
          title: "Flexbox",
          items: [
            { label: "Container", code: "display: flex;" },
            { label: "Direction", code: "flex-direction: row | row-reverse | column | column-reverse;" },
            { label: "Justify Content", code: "justify-content: flex-start | flex-end | center | space-between;" },
            { label: "Align Items", code: "align-items: stretch | flex-start | flex-end | center;" }
          ]
        },
        {
          title: "Grid",
          items: [
            { label: "Container", code: "display: grid;" },
            { label: "Columns", code: "grid-template-columns: repeat(3, 1fr);" },
            { label: "Gap", code: "gap: 10px;" }
          ]
        }
      ]
    },
    bash: {
      title: "Bash Scripting Cheat Sheet",
      desc: "Unix shell commands, scripting syntax, and automation utilities.",
      version: "v5",
      sections: [
        {
          title: "Variables & IO",
          items: [
            { label: "Variables", code: "NAME=\"John\"\necho $NAME\necho \"Hello ${NAME}\" // interpolation" },
            { label: "User Input", code: "read -p \"Enter name: \" USERNAME" },
            { label: "Arguments", code: "$0 // script name\n$1, $2 // positional args\n$# // number of args" }
          ]
        },
        {
          title: "Control Flow",
          items: [
            { label: "If Statement", code: "if [ \"$1\" == \"admin\" ]; then\n  echo \"Hi Admin\"\nelif [ \"$1\" == \"user\" ]; then\n  echo \"Hi User\"\nelse\n  echo \"Who are you?\"\nfi" },
            { label: "Loops", code: "for I in 1 2 3; do echo $I; done\nwhile [ $COUNT -lt 10 ]; do ((COUNT++)); done" }
          ]
        },
        {
          title: "Logic & Comparisons",
          items: [
            { label: "String Test", code: "-z $VAR // empty\n-n $VAR // not empty\n$V1 == $V2 // equal" },
            { label: "File Test", code: "-e $FILE // exists\n-d $DIR // is directory\n-f $FILE // is regular file" }
          ]
        },
        {
          title: "Pipes & Redirects",
          items: [
            { label: "Redirect", code: "ls > files.txt // overwrite\nls >> files.txt // append\n2> error.log // redirect stderr" },
            { label: "Pipe", code: "cat file.txt | grep \"error\" | wc -l" }
          ]
        }
      ]
    },
    vim: {
      title: "Vim Cheat Sheet",
      desc: "The ubiquitous text editor reference for efficiency and speed.",
      version: "v9.0",
      sections: [
        {
          title: "Modes & Basics",
          items: [
            { label: "Normal Mode", code: "<Esc>" },
            { label: "Insert Mode", code: "i (before), a (after), o (new line below)" },
            { label: "Command Mode", code: ":" },
            { label: "Visual Mode", code: "v (char), V (line), Ctrl+v (block)" }
          ]
        },
        {
          title: "Navigation",
          items: [
            { label: "Basic", code: "h (left), j (down), k (up), l (right)" },
            { label: "Words", code: "w (next word), b (prev word), e (end of word)" },
            { label: "Document", code: "gg (start), G (end), :num (go to line)" }
          ]
        },
        {
          title: "Editing",
          items: [
            { label: "Copy/Paste", code: "yy (yank line), p (paste), P (paste before)" },
            { label: "Delete", code: "x (char), dd (line), dw (word)" },
            { label: "Undo/Redo", code: "u (undo), Ctrl+r (redo)" },
            { label: "Search", code: "/pattern (forward), ?pattern (backward), n (next)" }
          ]
        },
        {
          title: "Saving & Quitting",
          items: [
            { label: "Commands", code: ":w (save), :q (quit), :wq (save & quit), :q! (force quit)" }
          ]
        }
      ]
    },
    sql: {
      title: "SQL Cheat Sheet",
      desc: "Relational database queries, data manipulation, and schema definition.",
      version: "Standard",
      sections: [
        {
          title: "Queries (DQL)",
          items: [
            { label: "Select", code: "SELECT column1, column2 FROM users\nWHERE status = 'active'\nORDER BY created_at DESC\nLIMIT 10;" },
            { label: "Joins", code: "SELECT u.name, p.title\nFROM users u\nJOIN posts p ON u.id = p.user_id;" },
            { label: "Aggregates", code: "SELECT category, COUNT(*) FROM products\nGROUP BY category\nHAVING COUNT(*) > 5;" }
          ]
        },
        {
          title: "Manipulation (DML)",
          items: [
            { label: "Insert", code: "INSERT INTO users (name, email) VALUES ('John', 'j@ex.com');" },
            { label: "Update", code: "UPDATE users SET status = 'banned' WHERE id = 12;" },
            { label: "Delete", code: "DELETE FROM users WHERE last_login < '2023-01-01';" }
          ]
        },
        {
          title: "Definition (DDL)",
          items: [
            { label: "Create Table", code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) UNIQUE,\n  email VARCHAR(255) NOT NULL\n);" },
            { label: "Alter Table", code: "ALTER TABLE users ADD COLUMN age INT;" }
          ]
        }
      ]
    },
    regex: {
      title: "Regex Cheat Sheet",
      desc: "Regular expression syntax for pattern matching and string manipulation.",
      version: "Global",
      sections: [
        {
          title: "Meta-characters",
          items: [
            { label: "Basics", code: ". (any), \\d (digit), \\D (not digit)\n\\w (word), \\W (not word), \\s (space), \\S (not space)" },
            { label: "Anchors", code: "^ (start), $ (end), \\b (word boundary)" }
          ]
        },
        {
          title: "Quantifiers",
          items: [
            { label: "Counts", code: "* (0+), + (1+), ? (0 or 1)\n{n} (exactly n), {n,} (n+), {n,m} (between n & m)" }
          ]
        },
        {
          title: "Groups & Sets",
          items: [
            { label: "Sets", code: "[abc] (any of), [^abc] (none of), [a-z] (range)" },
            { label: "Groups", code: "(abc) (group), (a|b) (a or b), (?:...) (non-capturing)" }
          ]
        },
        {
          title: "Lookaround",
          items: [
            { label: "Positive", code: "(?=...) (lookahead), (?<=...) (lookbehind)" },
            { label: "Negative", code: "(?!...) (lookahead), (?<!...) (lookbehind)" }
          ]
        }
      ]
    },
    java: {
      title: "Java Cheat Sheet",
      desc: "JVM-based object-oriented programming language for enterprise apps.",
      version: "Java 21",
      sections: [
        {
          title: "Basics",
          items: [
            { label: "Standard Class", code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}" },
            { label: "Variables", code: "int x = 5;\ndouble d = 1.99;\nString s = \"Java\";\nboolean b = true;" }
          ]
        },
        {
          title: "OOP Concepts",
          items: [
            { label: "Constructor", code: "class User {\n  String name;\n  User(String name) { this.name = name; }\n}" },
            { label: "Inheritance", code: "class Child extends Parent {\n  @Override void action() { ... }\n}" }
          ]
        },
        {
          title: "Collections & Streams",
          items: [
            { label: "ArrayList", code: "List<String> list = new ArrayList<>();\nlist.add(\"item\");\nlist.size();" },
            { label: "Streams", code: "list.stream()\n    .filter(s -> s.startsWith(\"A\"))\n    .map(String::toUpperCase)\n    .forEach(System.out::println);" }
          ]
        }
      ]
    },
    cpp: {
      title: "C++ Cheat Sheet",
      desc: "Advanced systems programming with high performance and memory control.",
      version: "C++20",
      sections: [
        {
          title: "Basics",
          items: [
            { label: "I/O", code: "#include <iostream>\nstd::cout << \"Output\" << std::endl;\nstd::cin >> x;" },
            { label: "References/Pointers", code: "int x = 10;\nint &ref = x; // reference\nint *ptr = &x; // pointer" }
          ]
        },
        {
          title: "STL Containers",
          items: [
            { label: "Vector", code: "std::vector<int> v = {1, 2};\nv.push_back(3);\nv.at(0);" },
            { label: "Unordered Map", code: "std::unordered_map<string, int> m;\nm[\"age\"] = 25;" }
          ]
        },
        {
          title: "Memory Management",
          items: [
            { label: "Dynamic Alloc", code: "int* p = new int(5);\ndelete p;" },
            { label: "Smart Pointers", code: "auto p = std::make_unique<Data>();\nstd::shared_ptr<Data> p2 = p1;" }
          ]
        }
      ]
    },
    go: {
      title: "Go (Golang) Cheat Sheet",
      desc: "Concurrent, efficient, and simple systems language from Google.",
      version: "v1.22",
      sections: [
        {
          title: "Syntax Basics",
          items: [
            { label: "Variables", code: "var x int = 10\ny := 20 // short dec\nconst PI = 3.14" },
            { label: "Structs", code: "type User struct {\n  Name string\n  Age  int\n}" },
            { label: "Methods", code: "func (u User) Greet() string {\n  return \"Hi \" + u.Name\n}" }
          ]
        },
        {
          title: "Concurrency",
          items: [
            { label: "Goroutines", code: "go someFunc()" },
            { label: "Channels", code: "ch := make(chan string)\nch <- \"ping\"\nmsg := <-ch" },
            { label: "Select", code: "select {\ncase m := <-c1: fmt.Println(m)\ncase <-time.After(time.Second): return\n}" }
          ]
        },
        {
          title: "Error Handling",
          items: [
            { label: "Pattern", code: "val, err := doWork()\nif err != nil {\n  return err\n}" }
          ]
        }
      ]
    },
    rust: {
      title: "Rust Cheat Sheet",
      desc: "Safe, concurrent, and high-performance systems language reference.",
      version: "v1.75",
      sections: [
        {
          title: "Core Syntax",
          items: [
            { label: "Variables", code: "let x = 5; // immutable\nlet mut y = 10; // mutable\nconst MAX: u32 = 100;" },
            { label: "Functions", code: "fn add(a: i32, b: i32) -> i32 {\n  a + b\n}" }
          ]
        },
        {
          title: "Ownership & Borrowing",
          items: [
            { label: "Concepts", code: "let s1 = String::from(\"hi\");\nlet s2 = s1; // move (s1 invalid)\nlet s3 = &s2; // borrow (ref)" },
            { label: "Mutable Borrow", code: "let mut s = String::from(\"hi\");\nfb(&mut s);" }
          ]
        },
        {
          title: "Pattern Matching",
          items: [
            { label: "Match", code: "match num {\n  1 => println!(\"One\"),\n  2..=5 => println!(\"2 to 5\"),\n  _ => println!(\"Else\"),\n}" },
            { label: "If Let", code: "if let Some(x) = opt { ... }" }
          ]
        }
      ]
    },
    php: {
      title: "PHP 8.x Cheat Sheet",
      desc: "Modern PHP syntax, array manipulation, and OOP reference.",
      version: "v8.3",
      sections: [
        {
          title: "Syntax Basics",
          items: [
            { label: "Interpolation", code: "\"Hello $name\"" },
            { label: "Null Coalescing", code: "$username = $_GET['user'] ?? 'guest';" },
            { label: "Match (PHP 8)", code: "$result = match($status) {\n  200 => 'OK',\n  404 => 'Not Found',\n  default => 'Unknown'\n};" }
          ]
        },
        {
          title: "Arrays",
          items: [
            { label: "Short Syntax", code: "$arr = [1, 2, 3];" },
            { label: "Spread", code: "$new = [...$arr, 4];" },
            { label: "Destructuring", code: "[$a, $b] = $array;" }
          ]
        },
        {
          title: "OOP & Types",
          items: [
            { label: "Constructor Prop", code: "class User {\n  public function __construct(\n    public string $name\n  ) {}\n}" },
            { label: "Attributes", code: "#[ExampleAttribute]\nclass MyClass {}" }
          ]
        }
      ]
    },
    ruby: {
      title: "Ruby Cheat Sheet",
      desc: "Dynamic, programmer-friendly language for modern web apps.",
      version: "v3.3",
      sections: [
        {
          title: "Basics",
          items: [
            { label: "Blocks", code: "3.times { |i| puts i }\n[1,2].each { |n| puts n }" },
            { label: "Symbols", code: ":id, :status" },
            { label: "Interpolation", code: "\"Name: #{user.name}\"" }
          ]
        },
        {
          title: "Classes",
          items: [
            { label: "Define", code: "class Person\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend" }
          ]
        },
        {
          title: "Enumerable",
          items: [
            { label: "Methods", code: "arr.map(&:upcase)\narr.select { |n| n.even? }\narr.reduce(0, :+)" }
          ]
        }
      ]
    },
    swift: {
      title: "Swift Cheat Sheet",
      desc: "Modern and safe programming language for iOS, macOS, and beyond.",
      version: "v5.10",
      sections: [
        {
          title: "Fundamentals",
          items: [
            { label: "Variables", code: "var name = \"Swift\"\nlet version = 5.10 // constant" },
            { label: "Optionals", code: "var age: Int? = nil\nif let unwrapped = age { ... }" },
            { label: "String Interp", code: "print(\"Value is \\(x)\")" }
          ]
        },
        {
          title: "Collections",
          items: [
            { label: "Arrays", code: "var list = [1, 2, 3]\nlist.append(4)" },
            { label: "Dictionaries", code: "let dict = [\"key\": \"val\"]" }
          ]
        },
        {
          title: "Functions & Closures",
          items: [
            { label: "Function", code: "func greet(p: String) -> String {\n  return \"Hi \\(p)\"\n}" },
            { label: "Closure", code: "let sum = { (a: Int, b: Int) -> Int in a + b }" }
          ]
        },
        {
          title: "Structs & Classes",
          items: [
            { label: "Struct", code: "struct Point {\n  var x, y: Int\n}" },
            { label: "Class", code: "class User {\n  var name: String\n  init(name: String) { self.name = name }\n}" }
          ]
        }
      ]
    },
    kotlin: {
      title: "Kotlin Cheat Sheet",
      desc: "Modern, concise language for Android, Server-side, and Multiplatform.",
      version: "v1.9",
      sections: [
        {
          title: "Core Syntax",
          items: [
            { label: "Variables", code: "val name = \"John\" // final\nvar age = 30 // mutable" },
            { label: "Null Safety", code: "var s: String? = null // nullable\nval len = s?.length ?: 0 // elvis" },
            { label: "Interp", code: "println(\"Hello $name\")" }
          ]
        },
        {
          title: "Functions",
          items: [
            { label: "Basic", code: "fun add(a: Int, b: Int): Int = a + b" },
            { label: "Default Args", code: "fun greet(n: String = \"User\") { ... }" }
          ]
        },
        {
          title: "Data Classes & Smart Casts",
          items: [
            { label: "Data Class", code: "data class User(val id: Int, val name: String)" },
            { label: "When (Switch)", code: "when (x) {\n  1 -> println(\"One\")\n  is String -> println(\"it's a string\")\n  else -> println(\"else\")\n}" }
          ]
        },
        {
          title: "Coroutines",
          items: [
            { label: "Launch", code: "scope.launch {\n  val data = fetchData()\n  updateUI(data)\n}" },
            { label: "Suspend", code: "suspend fun fetchData(): Data { ... }" }
          ]
        }
      ]
    },
    html: {
      title: "HTML5 Cheat Sheet",
      desc: "Comprehensive guide to HTML5 elements, attributes, and semantic structure.",
      version: "5.2",
      sections: [
        {
          title: "Getting Started",
          items: [
            { label: "HTML5 Boilerplate", code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>" },
            { label: "Comment", code: "<!-- This is a comment -->" },
            { label: "Paragraph", code: "<p>This is a paragraph.</p>" },
            { label: "Link", code: "<a href=\"https://google.com\" target=\"_blank\">Link Name</a>" },
            { label: "Image", code: "<img src=\"url\" alt=\"Description\" width=\"400\" height=\"400\">" }
          ]
        },
        {
          title: "Text Formatting",
          items: [
            { label: "Headings", code: "<h1>H1</h1>\n<h2>H2</h2>\n<h3>H3</h3>" },
            { label: "Bold & Italic", code: "<b>Bold</b>\n<strong>Important</strong>\n<i>Italic</i>\n<em>Emphasized</em>" },
            { label: "Lists (Unordered)", code: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>" },
            { label: "Lists (Ordered)", code: "<ol>\n  <li>First</li>\n  <li>Second</li>\n</ol>" }
          ]
        },
        {
          title: "Forms & Inputs",
          items: [
            { label: "Basic Form", code: "<form action=\"/submit\" method=\"POST\">\n  <input type=\"text\" name=\"username\">\n  <button type=\"submit\">Submit</button>\n</form>" },
            { label: "Input Types", code: "<input type=\"email\">\n<input type=\"password\">\n<input type=\"checkbox\">\n<input type=\"radio\">" },
            { label: "Select Menu", code: "<select name=\"cars\">\n  <option value=\"volvo\">Volvo</option>\n  <option value=\"saab\">Saab</option>\n</select>" },
            { label: "Textarea", code: "<textarea rows=\"4\" cols=\"50\"></textarea>" }
          ]
        },
        {
          title: "Semantic Tags",
          items: [
            { label: "Navigation", code: "<nav>\n  <ul>\n    <li><a href=\"#\">Home</a></li>\n  </ul>\n</nav>" },
            { label: "Sections", code: "<header></header>\n<main></main>\n<footer></footer>" },
            { label: "Article & Aside", code: "<article>\n  <h2>Title</h2>\n  <p>Content</p>\n</article>\n<aside>\n  Related items\n</aside>" }
          ]
        },
        {
          title: "Tables",
          items: [
            { label: "Simple Table", code: "<table>\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  <tr>\n    <td>Value 1</td>\n    <td>Value 2</td>\n  </tr>\n</table>" }
          ]
        }
      ]
    },
    sass: {
      title: "SASS/SCSS Cheat Sheet",
      desc: "Powerful CSS extension language with variables, nesting, and more.",
      version: "1.70",
      sections: [
        {
          title: "Basics",
          items: [
            { label: "Variables", code: "$primary-color: #333;\n$font-stack: Helvetica, sans-serif;\n\nbody {\n  color: $primary-color;\n  font: $font-stack;\n}" },
            { label: "Nesting", code: "nav {\n  ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n  }\n  li { display: inline-block; }\n  a {\n    display: block;\n    padding: 6px 12px;\n    text-decoration: none;\n  }\n}" },
            { label: "Import", code: "@import \"reset.scss\";\n@import \"base\", \"typography\";" }
          ]
        },
        {
          title: "Advanced Features",
          items: [
            { label: "Mixins", code: "@mixin theme($theme: DarkGray) {\n  background: $theme;\n  box-shadow: 0 0 1px rgba($theme, .25);\n  color: #fff;\n}\n\n.info {\n  @include theme;\n}\n.alert {\n  @include theme($theme: DarkRed);\n}" },
            { label: "Extend/Inheritance", code: "%message-shared {\n  border: 1px solid #ccc;\n  padding: 10px;\n  color: #333;\n}\n\n.message { @extend %message-shared; }\n.success { @extend %message-shared; border-color: green; }\n.error { @extend %message-shared; border-color: red; }" },
            { label: "Operators", code: ".container { width: 100% - 20px; }\narticle[role=\"main\"] { float: left; width: 600px / 960px * 100%; }" }
          ]
        },
        {
          title: "Interpolation & Functions",
          items: [
            { label: "String Interpolation", code: "$wk: -webkit-;\n.rounded-box {\n  #{$wk}border-radius: 4px;\n}" },
            { label: "Color Functions", code: "lighten(#007aff, 10%)\ndarken(#007aff, 10%)\nopacify(#007aff, 0.1)\ntransparentize(#007aff, 0.1)" }
          ]
        },
        {
          title: "Control Flow",
          items: [
            { label: "For Loop", code: "@for $i from 1 through 3 {\n  .item-#{$i} { width: 2em * $i; }\n}" },
            { label: "Each Loop", code: "@each $animal in puma, sea-slug, egret, salamander {\n  .#{$animal}-icon {\n    background-image: url('/images/#{$animal}.png');\n  }\n}" },
            { label: "While Loop", code: "$i: 6;\n@while $i > 0 {\n  .item-#{$i} { width: 2em * $i; }\n  $i: $i - 2;\n}" }
          ]
        }
      ]
    },
    tailwind: {
      title: "Tailwind CSS Cheat Sheet",
      desc: "Utility-first CSS framework for rapid UI development.",
      version: "v3.4",
      sections: [
        {
          title: "Layout",
          items: [
            { label: "Display", code: "block, inline-block, inline, flex, inline-flex, table, grid, hidden" },
            { label: "Flexbox", code: "flex-row, flex-col, flex-wrap, flex-1, flex-auto, flex-none" },
            { label: "Grid", code: "grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-4, gap-4" },
            { label: "Z-Index", code: "z-0, z-10, z-20, z-30, z-40, z-50, z-auto" }
          ]
        },
        {
          title: "Spacing & Sizing",
          items: [
            { label: "Padding", code: "p-0, p-1, p-2, p-3, p-4, px-4, py-2, pt-1, pr-1, pb-1, pl-1" },
            { label: "Margin", code: "m-0, m-1, m-2, m-3, m-4, mx-4, my-2, mt-1, mr-1, mb-1, ml-1" },
            { label: "Width", code: "w-0, w-px, w-1, w-2, w-3, w-4, w-auto, w-full, w-screen" },
            { label: "Height", code: "h-0, h-px, h-1, h-2, h-3, h-4, h-auto, h-full, h-screen" }
          ]
        },
        {
          title: "Typography",
          items: [
            { label: "Font Size", code: "text-xs, text-sm, text-base, text-lg, text-xl, text-2xl" },
            { label: "Font Weight", code: "font-thin, font-light, font-normal, font-medium, font-bold" },
            { label: "Text Alignment", code: "text-left, text-center, text-right, text-justify" },
            { label: "Text Color", code: "text-gray-500, text-red-500, text-blue-500, text-green-500" }
          ]
        },
        {
          title: "Backgrounds & Borders",
          items: [
            { label: "Background Color", code: "bg-gray-500, bg-red-500, bg-blue-500, bg-green-500" },
            { label: "Border Width", code: "border-0, border-2, border-4, border-8" },
            { label: "Border Color", code: "border-gray-500, border-red-500, border-blue-500" },
            { label: "Border Radius", code: "rounded-sm, rounded, rounded-md, rounded-lg, rounded-full" }
          ]
        },
        {
          title: "Interactive",
          items: [
            { label: "Hover", code: "hover:bg-blue-700 hover:scale-105" },
            { label: "Focus", code: "focus:outline-none focus:ring-2" },
            { label: "Transitions", code: "transition, transition-all, duration-75, duration-150, ease-in" }
          ]
        }
      ]
    },
    vue: {
      title: "Vue.js Cheat Sheet",
      desc: "Reactivity, Components, and the Composition API for Vue 3.",
      version: "v3",
      sections: [
        {
          title: "Setup & Directives",
          items: [
            { label: "Directives", code: "v-bind (:) - Bind attributes\nv-on (@) - Listen to events\nv-model - Two-way binding\nv-if / v-else - Conditional rendering\nv-show - Toggle visibility\nv-for - List rendering" },
            { label: "Attribute Binding", code: "<img :src=\"imageSrc\">\n<button :disabled=\"isPending\">Submit</button>" },
            { label: "Event Handling", code: "<button @click=\"count++\">Add</button>\n<form @submit.prevent=\"onSubmit\">...</form>" }
          ]
        },
        {
          title: "Composition API",
          items: [
            { label: "Reactivity", code: "import { ref, reactive, computed, watch } from 'vue'\n\nconst count = ref(0)\nconst state = reactive({ name: 'Vue' })\nconst double = computed(() => count.value * 2)" },
            { label: "Watchers", code: "watch(count, (newVal, oldVal) => {\n  console.log(`Changed from ${oldVal} to ${newVal}`)\n})" },
            { label: "Lifecycle Hooks", code: "onMounted(() => ...)\nonUnmounted(() => ...)\nonUpdated(() => ...)" }
          ]
        },
        {
          title: "Components",
          items: [
            { label: "SFC Template", code: "<script setup>\n  import Child from './Child.vue'\n  const props = defineProps(['msg'])\n  const emit = defineEmits(['change'])\n</script>\n\n<template>\n  <h1>{{ msg }}</h1>\n</template>" },
            { label: "Slots", code: "<slot name=\"header\"></slot>\n<slot></slot> // Default slot" }
          ]
        },
        {
          title: "Vue Router & Pinia",
          items: [
            { label: "Navigation", code: "<router-link to=\"/\">Home</router-link>\n<router-view></router-view>" },
            { label: "Programmatic Nav", code: "import { useRouter } from 'vue-router'\nconst router = useRouter()\nrouter.push('/dashboard')" },
            { label: "Pinia Store", code: "import { defineStore } from 'pinia'\nexport const useStore = defineStore('main', {\n  state: () => ({ counter: 0 }),\n  actions: { increment() { this.counter++ } }\n})" }
          ]
        }
      ]
    },
    angular: {
      title: "Angular Cheat Sheet",
      desc: "Enterprise-grade framework for building scalable web applications.",
      version: "v17",
      sections: [
        {
          title: "Component & Template",
          items: [
            { label: "Component Decorator", code: "@Component({\n  selector: 'app-user',\n  standalone: true,\n  template: `<h1>Hello {{ name }}</h1>`\n})\nexport class UserComponent { name = 'Angular'; }" },
            { label: "Interpolation", code: "{{ value }}" },
            { label: "Property Binding", code: "[property]=\"value\"" },
            { label: "Event Binding", code: "(click)=\"handler()\"" },
            { label: "Two-way Binding", code: "[(ngModel)]=\"value\"" }
          ]
        },
        {
          title: "Control Flow (v17+)",
          items: [
            { label: "@if", code: "@if (loggedIn) {\n  <p>Welcome!</p>\n} @else {\n  <button>Login</button>\n}" },
            { label: "@for", code: "@for (item of items; track item.id) {\n  <li>{{ item.name }}</li>\n} @empty {\n  <li>No items</li>\n}" }
          ]
        },
        {
          title: "Dependency Injection",
          items: [
            { label: "Service", code: "@Injectable({ providedIn: 'root' })\nexport class DataService { ... }" },
            { label: "Inject Service", code: "export class MyComp {\n  private dataService = inject(DataService);\n}" }
          ]
        },
        {
          title: "Signals",
          items: [
            { label: "Writable Signal", code: "const count = signal(0);\ncount.set(1);\ncount.update(n => n + 1);" },
            { label: "Computed Signal", code: "const double = computed(() => count() * 2);" },
            { label: "Effect", code: "effect(() => console.log(count()));" }
          ]
        }
      ]
    },
    svelte: {
      title: "Svelte Cheat Sheet",
      desc: "Highly efficient framework that compiles code at build time.",
      version: "v4",
      sections: [
        {
          title: "Reactivity",
          items: [
            { label: "State", code: "<script>\n  let count = 0;\n  const increment = () => count += 1;\n</script>\n<button on:click={increment}>{count}</button>" },
            { label: "Reactive Declarations", code: "$: doubled = count * 2;\n$: if (count >= 10) alert('High!');" }
          ]
        },
        {
          title: "Templating",
          items: [
            { label: "If/Else", code: "{#if count > 10}\n  <p>Large</p>\n{:else}\n  <p>Small</p>\n{/if}" },
            { label: "Each Loop", code: "{#each items as item (item.id)}\n  <li>{item.name}</li>\n{/each}" }
          ]
        },
        {
          title: "Props & Events",
          items: [
            { label: "Export Props", code: "// In Child.svelte\nexport let name = 'Friend';" },
            { label: "Event Dispatcher", code: "import { createEventDispatcher } from 'svelte';\nconst dispatch = createEventDispatcher();\ndispatch('notify', { text: 'Hello' });" }
          ]
        },
        {
          title: "Stores",
          items: [
            { label: "Writable Store", code: "import { writable } from 'svelte/store';\nexport const count = writable(0);\ncount.update(n => n + 1);\ncount.set(100);" },
            { label: "Auto-subscription", code: "<h1>The count is {$count}</h1>" }
          ]
        }
      ]
    },
    nextjs: {
      title: "Next.js Cheat Sheet",
      desc: "The React Production Framework with App Router support.",
      version: "v14",
      sections: [
        {
          title: "App Router Routing",
          items: [
            { label: "Page File", code: "// app/page.tsx\nexport default function Page() {\n  return <h1>Home Page</h1>\n}" },
            { label: "Dynamic Segment", code: "// app/blog/[slug]/page.tsx\nexport default function Post({ params }) {\n  return <h1>Post: {params.slug}</h1>\n}" },
            { label: "Layout File", code: "// app/layout.tsx\nexport default function Layout({ children }) {\n  return <html><body>{children}</body></html>\n}" }
          ]
        },
        {
          title: "Server Components & Actions",
          items: [
            { label: "Server Action", code: "// actions.ts\n'use server'\nexport async function create() { ... }" },
            { label: "Client Component", code: "'use client'\nimport { useState } from 'react'\n..." }
          ]
        },
        {
          title: "Data Fetching",
          items: [
            { label: "Fetch in Component", code: "async function getData() {\n  const res = await fetch('https://api...')\n  return res.json()\n}\n\nexport default async function Page() {\n  const data = await getData()\n  return <main>...</main>\n}" },
            { label: "Revalidation", code: "fetch(url, { next: { revalidate: 3600 } })" }
          ]
        },
        {
          title: "Special Files",
          items: [
            { label: "loading.tsx", code: "export default function Loading() { return <Skeleton /> }" },
            { label: "error.tsx", code: "'use client'\nexport default function Error() { return <div>Error!</div> }" },
            { label: "not-found.tsx", code: "export default function NotFound() { ... }" }
          ]
        }
      ]
    },
    graphql: {
      title: "GraphQL Cheat Sheet",
      desc: "Schema definition, queries, mutations, and fragments for GraphQL.",
      version: "Spec",
      sections: [
        {
          title: "Query & Mutation",
          items: [
            { label: "Basic Query", code: "query GetUser {\n  user(id: \"1\") {\n    name\n    email\n  }\n}" },
            { label: "Arguments", code: "query GetItems($limit: Int) {\n  items(limit: $limit) {\n    title\n  }\n}" },
            { label: "Mutation", code: "mutation CreateUser($input: UserInput!) {\n  createUser(input: $input) {\n    id\n    name\n  }\n}" },
            { label: "Aliases", code: "query {\n  admin: user(role: ADMIN) { name }\n  guest: user(role: GUEST) { name }\n}" }
          ]
        },
        {
          title: "Fragments & Variables",
          items: [
            { label: "Fragment", code: "fragment UserFields on User {\n  id\n  name\n  avatarUrl\n}\n\nquery {\n  user(id: \"1\") { ...UserFields }\n}" },
            { label: "Variables JSON", code: "{\n  \"limit\": 10,\n  \"input\": { \"name\": \"John\" }\n}" }
          ]
        },
        {
          title: "Schema Definition (SDL)",
          items: [
            { label: "Types", code: "type User {\n  id: ID!\n  username: String!\n  posts: [Post]!\n}" },
            { label: "Query Type", code: "type Query {\n  user(id: ID!): User\n  allUsers: [User]\n}" },
            { label: "Enums & Unions", code: "enum Role { ADMIN, USER }\nunion SearchResult = User | Post" }
          ]
        }
      ]
    },
    mongodb: {
      title: "MongoDB Cheat Sheet",
      desc: "NoSQL document database operations and aggregation pipeline.",
      version: "v7.0",
      sections: [
        {
          title: "CRUD Operations",
          items: [
            { label: "Insert", code: "db.collection.insertOne({ name: 'John' })\ndb.collection.insertMany([{ name: 'A' }, { name: 'B' }])" },
            { label: "Find", code: "db.collection.find({ age: { $gt: 18 } })\ndb.collection.findOne({ id: 1 })" },
            { label: "Update", code: "db.collection.updateOne(\n  { _id: 1 },\n  { $set: { status: 'active' } }\n)" },
            { label: "Delete", code: "db.collection.deleteOne({ _id: 1 })\ndb.collection.deleteMany({ status: 'inactive' })" }
          ]
        },
        {
          title: "Query Operators",
          items: [
            { label: "Comparison", code: "$eq, $ne, $gt, $lt, $gte, $lte, $in, $nin" },
            { label: "Logical", code: "$and, $or, $not, $nor" },
            { label: "Element", code: "$exists, $type" }
          ]
        },
        {
          title: "Aggregation Pipeline",
          items: [
            { label: "Match", code: "{ $match: { status: 'A' } }" },
            { label: "Group", code: "{ $group: { _id: '$category', total: { $sum: 1 } } }" },
            { label: "Sort & Limit", code: "{ $sort: { age: -1 } }, { $limit: 5 }" },
            { label: "Project", code: "{ $project: { name: 1, email: 1, _id: 0 } }" }
          ]
        },
        {
          title: "Indexing",
          items: [
            { label: "Create Index", code: "db.collection.createIndex({ email: 1 }, { unique: true })" },
            { label: "List Indexes", code: "db.collection.getIndexes()" }
          ]
        }
      ]
    },
    redis: {
      title: "Redis Cheat Sheet",
      desc: "Fast, in-memory data store for caching and real-time data.",
      version: "v7.2",
      sections: [
        {
          title: "Strings & Basics",
          items: [
            { label: "Set/Get", code: "SET user:1 \"John\"\nGET user:1" },
            { label: "Incr/Decr", code: "INCR counter\nDECRBY counter 10" },
            { label: "Exists/Del", code: "EXISTS key\nDEL key" },
            { label: "Expire (TTL)", code: "EXPIRE user:1 3600\nTTL user:1" }
          ]
        },
        {
          title: "Lists & Hashes",
          items: [
            { label: "Lists", code: "LPUSH queue task1\nRPop queue\nLRANGE queue 0 -1" },
            { label: "Hashes", code: "HSET user:1 name \"John\" age 30\nHGET user:1 name\nHGETALL user:1" }
          ]
        },
        {
          title: "Sets & Sorted Sets",
          items: [
            { label: "Sets", code: "SADD tags \"news\"\nSMEMBERS tags\nSISMEMBER tags \"news\"" },
            { label: "Sorted Sets", code: "ZADD leaderboard 100 \"John\" 150 \"Alice\"\nZRANGE leaderboard 0 -1 WITHSCORES" }
          ]
        },
        {
          title: "Pub/Sub",
          items: [
            { label: "Publish", code: "PUBLISH channel1 \"hello\"" },
            { label: "Subscribe", code: "SUBSCRIBE channel1" }
          ]
        }
      ]
    },
    postgresql: {
      title: "PostgreSQL Cheat Sheet",
      desc: "Advanced open-source relational database with powerful SQL support.",
      version: "v16",
      sections: [
        {
          title: "Basic Commands",
          items: [
            { label: "psql Connect", code: "\\c database_name" },
            { label: "List Databases", code: "\\l" },
            { label: "List Tables", code: "\\dt" },
            { label: "Describe Table", code: "\\d table_name" }
          ]
        },
        {
          title: "Table Operations",
          items: [
            { label: "Create Table", code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100),\n  created_at TIMESTAMP DEFAULT NOW()\n);" },
            { label: "Alter Table", code: "ALTER TABLE users ADD COLUMN age INT;" }
          ]
        },
        {
          title: "Querying & JSONB",
          items: [
            { label: "Basic Select", code: "SELECT * FROM users WHERE age > 21 LIMIT 10;" },
            { label: "JSONB Query", code: "SELECT metadata->>'role' FROM users WHERE metadata @> '{\"status\": \"active\"}';" },
            { label: "JSONB Update", code: "UPDATE users SET metadata = metadata || '{\"premium\": true}';" }
          ]
        },
        {
          title: "Common Functions",
          items: [
            { label: "Aggregates", code: "COUNT(*), SUM(vol), AVG(price), MIN(val), MAX(val)" },
            { label: "CTE (WITH)", code: "WITH recent_users AS (\n  SELECT * FROM users WHERE created_at > NOW() - INTERVAL '1 day'\n)\nSELECT * FROM recent_users;" }
          ]
        }
      ]
    },
    kubernetes: {
      title: "Kubernetes Cheat Sheet",
      desc: "Container orchestration, workload management, and cluster operations.",
      version: "v1.29",
      sections: [
        {
          title: "Basic Commands",
          items: [
            { label: "Check Status", code: "kubectl cluster-info\nkubectl get nodes\nkubectl version" },
            { label: "Context & Namespace", code: "kubectl config get-contexts\nkubectl config use-context <name>\nkubectl get ns" }
          ]
        },
        {
          title: "Workloads (Pods/Deploy)",
          items: [
            { label: "Pods", code: "kubectl get pods\nkubectl run redis --image=redis\nkubectl describe pod <name>" },
            { label: "Deployments", code: "kubectl get deploy\nkubectl create deployment nginx --image=nginx\nkubectl scale deploy nginx --replicas=3" },
            { label: "Logs & Exec", code: "kubectl logs <pod-name>\nkubectl exec -it <pod-name> -- /bin/bash" }
          ]
        },
        {
          title: "Services & Networking",
          items: [
            { label: "Services", code: "kubectl get svc\nkubectl expose deploy nginx --port=80 --type=NodePort" },
            { label: "Port Forward", code: "kubectl port-forward <pod-name> 8080:80" },
            { label: "Ingress", code: "kubectl get ingress" }
          ]
        },
        {
          title: "Config & Storage",
          items: [
            { label: "ConfigMaps/Secrets", code: "kubectl get configmaps\nkubectl get secrets" },
            { label: "Apply YAML", code: "kubectl apply -f manifest.yaml\nkubectl delete -f manifest.yaml" }
          ]
        }
      ]
    },
    aws: {
      title: "AWS CLI Cheat Sheet",
      desc: "Managing AWS services via the command line interface.",
      version: "v2",
      sections: [
        {
          title: "Configuration",
          items: [
            { label: "Configure", code: "aws configure\naws configure --profile <name>" },
            { label: "Check Caller", code: "aws sts get-caller-identity" }
          ]
        },
        {
          title: "S3 (Storage)",
          items: [
            { label: "List Buckets", code: "aws s3 ls" },
            { label: "Object Ops", code: "aws s3 cp file.txt s3://bucket/\naws s3 sync . s3://bucket/\naws s3 rm s3://bucket/file.txt" }
          ]
        },
        {
          title: "EC2 (Computing)",
          items: [
            { label: "Instances", code: "aws ec2 describe-instances\naws ec2 start-instances --instance-ids <id>\naws ec2 stop-instances --instance-ids <id>" }
          ]
        },
        {
          title: "Lambda & IAM",
          items: [
            { label: "Lambda", code: "aws lambda list-functions\naws lambda invoke --function-name <name> out.json" },
            { label: "IAM", code: "aws iam list-users\naws iam create-user --user-name <name>" }
          ]
        }
      ]
    },
    jenkins: {
      title: "Jenkins Cheat Sheet",
      desc: "Automation server for continuous integration and delivery.",
      version: "LTS",
      sections: [
        {
          title: "Declarative Pipeline",
          items: [
            { label: "Basic Blueprint", code: "pipeline {\n  agent any\n  stages {\n    stage('Build') { steps { sh 'npm install' } }\n    stage('Test') { steps { sh 'npm test' } }\n    stage('Deploy') { steps { echo 'Deploying...' } }\n  }\n}" },
            { label: "Environment Vars", code: "environment {\n  DB_USER = 'admin'\n  API_KEY = credentials('my-api-key')\n}" }
          ]
        },
        {
          title: "Steps & Post",
          items: [
            { label: "Common Steps", code: "sh 'script.sh'\necho 'message'\narchiveArtifacts 'build/**/*'\njunit 'tests/*.xml'" },
            { label: "Post Actions", code: "post {\n  always { echo 'Done' }\n  success { echo 'Success!' }\n  failure { mail to: 'me@ex.com', subject: 'Failed' }\n}" }
          ]
        },
        {
          title: "Triggers & Parameters",
          items: [
            { label: "Triggers", code: "triggers {\n  cron('H 4 * * *')\n  pollSCM('H/15 * * * *')\n}" },
            { label: "Parameters", code: "parameters {\n  string(name: 'BRANCH', defaultValue: 'main')\n  booleanParam(name: 'DEBUG', defaultValue: true)\n}" }
          ]
        }
      ]
    },
    terraform: {
      title: "Terraform Cheat Sheet",
      desc: "Infrastructure as Code tool for building and versioning infrastructure safely.",
      version: "1.7",
      sections: [
        {
          title: "Core Workflow",
          items: [
            { label: "Initialize", code: "terraform init" },
            { label: "Plan", code: "terraform plan" },
            { label: "Apply", code: "terraform apply\nterraform apply -auto-approve" },
            { label: "Destroy", code: "terraform destroy" }
          ]
        },
        {
          title: "Resource & Provider",
          items: [
            { label: "Provider", code: "provider \"aws\" {\n  region = \"us-east-1\"\n}" },
            { label: "Resource", code: "resource \"aws_instance\" \"web\" {\n  ami = \"ami-12345\"\n  instance_type = \"t2.micro\"\n}" }
          ]
        },
        {
          title: "Variables & Output",
          items: [
            { label: "Variables", code: "variable \"region\" { default = \"us-east-1\" }\nvar.region" },
            { label: "Outputs", code: "output \"ip\" { value = aws_instance.web.public_ip }" }
          ]
        },
        {
          title: "State Management",
          items: [
            { label: "State Commands", code: "terraform state list\nterraform state show <name>\nterraform state rm <name>" }
          ]
        }
      ]
    },
    ansible: {
      title: "Ansible Cheat Sheet",
      desc: "Simple, agentless IT automation for configuration management and app deployment.",
      version: "2.16",
      sections: [
        {
          title: "Ad-Hoc Commands",
          items: [
            { label: "Ping", code: "ansible all -m ping" },
            { label: "Shell Command", code: "ansible all -a \"uptime\"" },
            { label: "Copy File", code: "ansible all -m copy -a \"src=file.txt dest=/tmp/\"" }
          ]
        },
        {
          title: "Playbooks",
          items: [
            { label: "Run Playbook", code: "ansible-playbook site.yml" },
            { label: "Syntax Check", code: "ansible-playbook site.yml --syntax-check" },
            { label: "Inventory", code: "ansible-playbook -i inventory.ini site.yml" }
          ]
        },
        {
          title: "Playbook Syntax",
          items: [
            { label: "Structure", code: "- name: Setup Server\n  hosts: all\n  tasks:\n    - name: Install Nginx\n      apt: name=nginx state=latest" },
            { label: "Variables", code: "vars:\n  http_port: 80\ntasks:\n  - debug: msg=\"Port is {{ http_port }}\"" }
          ]
        },
        {
          title: "Handlers & Roles",
          items: [
            { label: "Handlers", code: "tasks:\n  - apt: name=nginx\n    notify: restart nginx\n\nhandlers:\n  - name: restart nginx\n    service: name=nginx state=restarted" },
            { label: "Roles", code: "roles:\n  - role: common\n  - role: webservers" }
          ]
        }
      ]
    },
    linux: {
      title: "Linux CLI Cheat Sheet",
      desc: "Essential Unix/Linux commands for terminal productivity.",
      version: "Latest",
      sections: [
        {
          title: "File Operations",
          items: [
            { label: "ls", code: "ls -la // list all files\nls -lh // human readable sizes" },
            { label: "cp / mv", code: "cp src dest // copy\nmv old new // move/rename" },
            { label: "rm", code: "rm -rf dir // recursive force delete" },
            { label: "mkdir / touch", code: "mkdir -p a/b // create directory tree\ntouch file.txt // create empty file" }
          ]
        },
        {
          title: "Searching",
          items: [
            { label: "grep", code: "grep \"pattern\" file\ngrep -r \"pattern\" . // recursive" },
            { label: "find", code: "find . -name \"*.txt\"\nfind /var/log -type f -mtime +30" }
          ]
        },
        {
          title: "Permissions",
          items: [
            { label: "chmod", code: "chmod 755 script.sh\nchmod u+x file" },
            { label: "chown", code: "chown user:group file\nsudo chown -R $USER:$USER ." }
          ]
        },
        {
          title: "System Info",
          items: [
            { label: "Top/Htop", code: "top\nhtop // interactive process viewer" },
            { label: "Disk Usage", code: "df -h // disk space\ndu -sh . // folder size" }
          ]
        }
      ]
    },
    powershell: {
      title: "PowerShell Cheat Sheet",
      desc: "Windows-native and cross-platform automation and configuration shell.",
      version: "v7.4",
      sections: [
        {
          title: "File System",
          items: [
            { label: "List Items", code: "ls\nGet-ChildItem -Recurse" },
            { label: "New Item", code: "New-Item -ItemType File name.txt\nmkdir folder" },
            { label: "Copy/Move", code: "Copy-Item src dest\nMove-Item old new" }
          ]
        },
        {
          title: "Pipeline & Filtering",
          items: [
            { label: "Where-Object", code: "Get-Service | Where-Object Status -eq 'Running'" },
            { label: "Select-Object", code: "Get-Process | Select-Object Name, Id -First 10" },
            { label: "ForEach-Object", code: "1..5 | ForEach-Object { $_ * 2 }" }
          ]
        },
        {
          title: "Common Verbs",
          items: [
            { label: "Get", code: "Get-Command\nGet-Help Get-Service" },
            { label: "Set", code: "Set-ExecutionPolicy RemoteSigned" }
          ]
        }
      ]
    },
    npm: {
      title: "NPM & package.json",
      desc: "Node Package Manager reference for dependencies and scripts.",
      version: "v10+",
      sections: [
        {
          title: "Basic Commands",
          items: [
            { label: "Install", code: "npm install // all from package.json\nnpm install <name> // save to dependencies\nnpm i <name> -D // save to devDependencies" },
            { label: "Update/Uninstall", code: "npm update <name>\nnpm uninstall <name>" },
            { label: "Run Scripts", code: "npm run dev\nnpm start" }
          ]
        },
        {
          title: "Management",
          items: [
            { label: "Init", code: "npm init -y" },
            { label: "List", code: "npm list --depth=0" },
            { label: "Outdated", code: "npm outdated" }
          ]
        },
        {
          title: "Semantic Versioning",
          items: [
            { label: "Caret (^)", code: "^1.2.3 // 1.x.x (updates minor/patch)" },
            { label: "Tilde (~)", code: "~1.2.3 // 1.2.x (updates patch only)" },
            { label: "Exact", code: "1.2.3 // only this version" }
          ]
        }
      ]
    },
    "react-hooks": {
      title: "React Hooks Cheat Sheet",
      desc: "Complete guide to useState, useEffect, and custom hooks.",
      version: "v18",
      sections: [
        {
          title: "Basic Hooks",
          items: [
            { label: "useState", code: "const [state, setState] = useState(initialState);" },
            { label: "useEffect", code: "useEffect(() => {\n  // Effect\n  return () => { /* Cleanup */ };\n}, [dependencies]);" },
            { label: "useContext", code: "const value = useContext(MyContext);" }
          ]
        },
        {
          title: "Additional Hooks",
          items: [
            { label: "useReducer", code: "const [state, dispatch] = useReducer(reducer, initialArg, init?);" },
            { label: "useCallback", code: "const memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);" },
            { label: "useMemo", code: "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);" },
            { label: "useRef", code: "const refContainer = useRef(initialValue);" },
            { label: "useImperativeHandle", code: "useImperativeHandle(ref, () => ({\n  focus: () => { inputRef.current.focus(); }\n}));" },
            { label: "useLayoutEffect", code: "useLayoutEffect(() => {\n  // Fires synchronously after all DOM mutations\n}, []);" },
            { label: "useDebugValue", code: "useDebugValue(value);" }
          ]
        }
      ]
    },
    "git-commands": {
      title: "Git Command Reference",
      desc: "Essential git commands for daily workflow and recovery.",
      version: "v2.4x",
      sections: [
        {
          title: "Setup & Init",
          items: [
            { label: "Global Config", code: "git config --global user.name \"Name\"\ngit config --global user.email \"email@example.com\"" },
            { label: "Init", code: "git init" },
            { label: "Clone", code: "git clone <repo-url>" }
          ]
        },
        {
          title: "Staging & Committing",
          items: [
            { label: "Status", code: "git status" },
            { label: "Add All", code: "git add ." },
            { label: "Commit", code: "git commit -m \"Message\"" },
            { label: "Amend (Fix last commit)", code: "git commit --amend" }
          ]
        },
        {
          title: "Branching & Merging",
          items: [
            { label: "List Branches", code: "git branch" },
            { label: "New Branch", code: "git checkout -b <branch-name>" },
            { label: "Delete Branch", code: "git branch -d <branch-name>" },
            { label: "Merge", code: "git merge <branch-name>" },
            { label: "Rebase", code: "git rebase master" }
          ]
        },
        {
          title: "Undo & Recovery",
          items: [
            { label: "Discard Changes", code: "git checkout -- <file>" },
            { label: "Unstage", code: "git reset HEAD <file>" },
            { label: "Hard Reset", code: "git reset --hard HEAD" },
            { label: "Revert Commit", code: "git revert <commit-hash>" }
          ]
        }
      ]
    },
    "docker-compose": {
      title: "Docker Compose Patterns",
      desc: "Production-ready docker-compose templates for microservices.",
      version: "v2.24",
      sections: [
        {
          title: "Basic Service",
          items: [
            { label: "Web Service", code: "services:\n  web:\n    image: nginx:alpine\n    ports:\n      - \"80:80\"" }
          ]
        },
        {
          title: "Database with Volume",
          items: [
            { label: "PostgreSQL", code: "services:\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: example\n    volumes:\n      - db_data:/var/lib/postgresql/data\nvolumes:\n  db_data:" }
          ]
        },
        {
          title: "Networking",
          items: [
            { label: "Custom Network", code: "networks:\n  frontend:\n  backend:\n\nservices:\n  app:\n    networks:\n      - frontend\n      - backend" }
          ]
        },
        {
          title: "Commands",
          items: [
            { label: "Start", code: "docker-compose up -d" },
            { label: "Stop", code: "docker-compose down" },
            { label: "Logs", code: "docker-compose logs -f" },
            { label: "Build", code: "docker-compose build" }
          ]
        }
      ]
    },
    "python-async": {
      title: "Python Async/Await",
      desc: "Deep dive into asyncio, coroutines, and event loops.",
      version: "3.11+",
      sections: [
        {
          title: "Coroutines",
          items: [
            { label: "Define", code: "async def fetch_data():\n    print('start')\n    await asyncio.sleep(1)\n    print('done')\n    return {'data': 1}" },
            { label: "Run", code: "import asyncio\nasyncio.run(fetch_data())" }
          ]
        },
        {
          title: "Concurrency",
          items: [
            { label: "Gather (Parallel)", code: "async def main():\n    L = await asyncio.gather(\n        fetch_data(),\n        fetch_data(),\n        fetch_data()\n    )\n    print(L)" }
          ]
        },
        {
          title: "Tasks",
          items: [
            { label: "Create Task", code: "task = asyncio.create_task(other_coro())" },
            { label: "Wait for Task", code: "await task" }
          ]
        }
      ]
    },
    "css-grid": {
      title: "CSS Grid Layouts",
      desc: "Copy-paste ready CSS grid snippets for modern web layouts.",
      version: "L3",
      sections: [
        {
          title: "Container",
          items: [
            { label: "Define Grid", code: "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;" },
            { label: "Inline Grid", code: "display: inline-grid;" }
          ]
        },
        {
          title: "Columns & Rows",
          items: [
            { label: "Fixed Width", code: "grid-template-columns: 100px 200px auto;" },
            { label: "Repeat", code: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));" },
            { label: "Fraction", code: "grid-template-columns: 1fr 2fr;" }
          ]
        },
        {
          title: "Alignment",
          items: [
            { label: "Justify Items", code: "justify-items: start | end | center | stretch;" },
            { label: "Align Items", code: "align-items: start | end | center | stretch;" },
            { label: "Place Content", code: "place-content: center;" }
          ]
        },
        {
          title: "Children",
          items: [
            { label: "Span Columns", code: "grid-column: span 2;" },
            { label: "Specific Area", code: "grid-area: header;" }
          ]
        }
      ]
    },
    "go-concurrency": {
      title: "Go Concurrency Patterns",
      desc: "Visual guide to channels, waitgroups, and mutexes in Go.",
      version: "1.21",
      sections: [
        {
          title: "Goroutines",
          items: [
            { label: "Start", code: "go myFunction()" },
            { label: "Anonymous", code: "go func() {\n    fmt.Println(\"Async\")\n}()" }
          ]
        },
        {
          title: "Channels",
          items: [
            { label: "Create", code: "ch := make(chan int)" },
            { label: "Send", code: "ch <- 42" },
            { label: "Receive", code: "val := <-ch" },
            { label: "Buffered", code: "ch := make(chan int, 100)" },
            { label: "Close", code: "close(ch)" }
          ]
        },
        {
          title: "Synchronization",
          items: [
            { label: "WaitGroup", code: "var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    doWork()\n}()\nwg.Wait()" },
            { label: "Mutex", code: "var mu sync.Mutex\nmu.Lock()\n// critical section\nmu.Unlock()" }
          ]
        },
        {
          title: "Select",
          items: [
            { label: "Select Statement", code: "select {\ncase msg1 := <-c1:\n    fmt.Println(msg1)\ncase msg2 := <-c2:\n    fmt.Println(msg2)\ncase <-time.After(1 * time.Second):\n    fmt.Println(\"timeout\")\n}" }
          ]
        }
      ]
    },
    "nextjs-handbook": {
      title: "Next.js 14 Handbook",
      desc: "Routing, Server Actions, and new App Router patterns.",
      version: "14.1",
      sections: [
        {
          title: "Routing",
          items: [
            { label: "Page", code: "export default function Page() {\n  return <h1>Hello</h1>\n}" },
            { label: "Layout", code: "export default function Layout({ children }) {\n  return <div>{children}</div>\n}" },
            { label: "Loading UI", code: "export default function Loading() {\n  return <Skeleton />\n}" }
          ]
        },
        {
          title: "Data Fetching",
          items: [
            { label: "Server Component", code: "async function getData() {\n  const res = await fetch('https://api.example.com/...')\n  return res.json()\n}\n\nexport default async function Page() {\n  const data = await getData()\n  return <main>{/* ... */}</main>\n}" }
          ]
        },
        {
          title: "Server Actions",
          items: [
            { label: "Define Action", code: "'use server'\n\nexport async function create() {\n  // ...\n}" },
            { label: "Invoke Form", code: "<form action={create}>\n  <button>Submit</button>\n</form>" }
          ]
        }
      ]
    },
    "linux-perm": {
      title: "Linux Permissions Guide",
      desc: "Chmod, Chown, and file system permissions explained.",
      version: "Std",
      sections: [
        {
          title: "Understanding Mode",
          items: [
            { label: "rwx", code: "Read (4) + Write (2) + Execute (1)" },
            { label: "User Group Others", code: "u=rwx, g=r-x, o=r--" }
          ]
        },
        {
          title: "Chmod (Change Mode)",
          items: [
            { label: "Numeric 755", code: "chmod 755 file.sh\n# u: rwx (7)\n# g: r-x (5)\n# o: r-x (5)" },
            { label: "Symbolic", code: "chmod u+x file.sh" },
            { label: "Recursive", code: "chmod -R 755 directory/" }
          ]
        },
        {
          title: "Chown (Change Owner)",
          items: [
            { label: "Change User", code: "chown user file" },
            { label: "User & Group", code: "chown user:group file" },
            { label: "Recursive", code: "chown -R user:group directory/" }
          ]
        }
      ]
    },


  };

  const cheatSheetData = allCheatSheets[id] || {
    title: "Not Found",
    desc: "This cheat sheet doesn't exist yet.",
    version: "N/A",
    sections: []
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-6 pb-20 max-w-5xl mx-auto w-full">

        {/* Header */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/cheatsheets" className="text-ossium-muted hover:text-white transition-colors text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Index
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-ossium-accent text-xs font-mono px-2 py-0.5 rounded bg-ossium-accent/10 border border-ossium-accent/20">
              {cheatSheetData.version}
            </span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">{cheatSheetData.title}</h1>
          <p className="text-lg text-ossium-muted">{cheatSheetData.desc}</p>
        </div>

        {/* Masonry-like Grid for Sections */}
        {cheatSheetData.sections.length > 0 ? (
          <div className="flex flex-col gap-8">
            {cheatSheetData.sections.map((section, sIdx) => (
              <div key={sIdx} className="break-inside-avoid bg-[#121212] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-ossium-muted text-xs font-mono">{sIdx + 1}</span>
                  {section.title}
                </h2>

                <div className="space-y-6">
                  {section.items.map((item, iIdx) => {
                    const uniqueId = `${sIdx}-${iIdx}`;
                    return (
                      <div key={iIdx} className="group">
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-sm text-ossium-muted font-medium ml-1">{item.label}</span>
                          <button
                            onClick={() => handleCopy(item.code, uniqueId)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-wider text-ossium-accent hover:text-white"
                          >
                            {copiedId === uniqueId ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="relative">
                          <pre className="overflow-x-auto bg-[#080808] border border-white/5 rounded-lg p-3 text-sm font-mono text-gray-300 leading-relaxed shadow-inner scrollbar-hide">
                            <code>{item.code}</code>
                          </pre>
                          {/* Visual Accent Bar */}
                          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-ossium-accent/30 rounded-r opacity-50"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 rounded-full bg-white/5 mb-4">
              <svg className="w-8 h-8 text-ossium-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cheat Sheet Not Found</h3>
            <p className="text-ossium-muted max-w-sm">We couldn't find a cheat sheet for "{id}". It might be coming soon or you may have followed a broken link.</p>
            <Link to="/cheatsheets" className="mt-8 px-6 py-2 bg-ossium-accent text-ossium-darker rounded-lg font-bold hover:opacity-90 transition-opacity">
              Browse All Sheets
            </Link>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default CheatSheetDetail;
