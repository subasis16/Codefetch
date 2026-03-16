
import React from 'react';
import {
  SiReact, SiJavascript, SiNodedotjs, SiGit,
  SiPython, SiDocker, SiCss3, SiTypescript,
  SiHtml5, SiMongodb, SiPostgresql, SiTailwindcss
} from 'react-icons/si';

export const errorsData = [
  // --- JavaScript (Beginner) ---
  {
    id: 1,
    tech: 'JavaScript',
    level: 'Beginner',
    error: "Uncaught TypeError: Cannot read property 'x' of undefined",
    cause: "Trying to access a property on a variable that is currently undefined.",
    fix: "Check if the variable is defined before accessing: if (obj) obj.x or use optional chaining obj?.x",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 2,
    tech: 'JavaScript',
    level: 'Beginner',
    error: "ReferenceError: x is not defined",
    cause: "Using a variable that hasn't been declared or is out of scope.",
    fix: "Declare the variable with let/const/var or check spelling.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 3,
    tech: 'JavaScript',
    level: 'Beginner',
    error: "SyntaxError: Unexpected token",
    cause: "Typo in code, missing parenthesis, bracket, or comma.",
    fix: "Check line number in error, verify matching brackets/parentheses.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 4,
    tech: 'JavaScript',
    level: 'Beginner',
    error: "NaN (Not a Number)",
    cause: "Result of an invalid math operation (e.g., multiplying string by number).",
    fix: "Validate inputs, use isNaN() to check, ensure types are numbers.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 5,
    tech: 'JavaScript',
    level: 'Intermediate',
    error: "TypeError: x is not a function",
    cause: "Trying to call something that isn't a function (e.g., an object or undefined).",
    fix: "Check variable assignment, ensure correct method name spelling.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 6,
    tech: 'JavaScript',
    level: 'Intermediate',
    error: "RangeError: Maximum call stack size exceeded",
    cause: "Infinite recursion or function calling itself without exit condition.",
    fix: "Check recursive base cases, ensure loops terminate.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 7,
    tech: 'JavaScript',
    level: 'Intermediate',
    error: "Assignment to constant variable",
    cause: "Trying to reassign a value to a variable declared with const.",
    fix: "Use let instead of const if value needs to change.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 8,
    tech: 'JavaScript',
    level: 'Intermediate',
    error: "Loop is infinite (Browser freezes)",
    cause: "For/While loop condition never becomes false.",
    fix: "Check loop increments and termination conditions.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 9,
    tech: 'JavaScript',
    level: 'Advanced',
    error: "Promise { <pending> } logged",
    cause: "Logging a promise logging output instead of awaited value.",
    fix: "Use await or .then() to access promise result.",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },
  {
    id: 10,
    tech: 'JavaScript',
    level: 'Advanced',
    error: "this is undefined",
    cause: "Function context lost, often in callbacks or event handlers.",
    fix: "Use arrow functions (() => {}) or .bind(this).",
    icon: <SiJavascript />,
    color: 'text-yellow-400'
  },

  // --- Python (Beginner/Intermediate) ---
  {
    id: 11,
    tech: 'Python',
    level: 'Beginner',
    error: "IndentationError: unexpected indent",
    cause: "Mixing tabs/spaces or wrong indentation level.",
    fix: "Standardize on 4 spaces. Fix editor settings.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 12,
    tech: 'Python',
    level: 'Beginner',
    error: "NameError: name 'x' is not defined",
    cause: "Using a variable before assignment or typo in name.",
    fix: "Check spelling and ensure variable is defined before use.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 13,
    tech: 'Python',
    level: 'Beginner',
    error: "TypeError: 'list' object is not callable",
    cause: "Overwriting built-in 'list' with a variable (e.g., list = [1,2]).",
    fix: "Rename variable, don't use reserved keywords.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 14,
    tech: 'Python',
    level: 'Beginner',
    error: "IndexError: list index out of range",
    cause: "Accessing index N in list of size N (indices are 0 to N-1).",
    fix: "Check list length with len(), ensure index < length.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 15,
    tech: 'Python',
    level: 'Beginner',
    error: "KeyError: 'x'",
    cause: "Accessing dict key that doesn't exist.",
    fix: "Use .get('x') or check 'if key in dict'.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 16,
    tech: 'Python',
    level: 'Intermediate',
    error: "AttributeError: 'NoneType' object has no attribute 'x'",
    cause: "Calling method on variable that is None (e.g., failed function return).",
    fix: "Check why variable is None, add 'if var is not None' check.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 17,
    tech: 'Python',
    level: 'Intermediate',
    error: "ImportError: No module named 'x'",
    cause: "Module not installed or virtual environment not active.",
    fix: "pip install x, check virtualenv.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 18,
    tech: 'Python',
    level: 'Intermediate',
    error: "ValueError: invalid literal for int() with base 10",
    cause: "Converting non-number string (e.g., 'hello') to int.",
    fix: "Sanitize input, ensure string contains only digits.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 19,
    tech: 'Python',
    level: 'Advanced',
    error: "RecursionError: maximum recursion depth exceeded",
    cause: "Infinite recursion, stack overflow.",
    fix: "Increase recursion limit (sys.setrecursionlimit) or fix base case.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },
  {
    id: 20,
    tech: 'Python',
    level: 'Expert',
    error: "GIL (Global Interpreter Lock) limitations",
    cause: "Threads not running in parallel on multi-core CPU.",
    fix: "Use multiprocessing module instead of threading for CPU-bound tasks.",
    icon: <SiPython />,
    color: 'text-blue-500'
  },

  // --- React (Mixed) ---
  {
    id: 21,
    tech: 'React',
    level: 'Beginner',
    error: "Adjacent JSX elements must be wrapped in an enclosing tag",
    cause: "Returning two siblings elements from component.",
    fix: "Wrap in <> ... </> (Fragment) or <div> ... </div>.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 22,
    tech: 'React',
    level: 'Beginner',
    error: "Objects are not valid as a React child",
    cause: "Trying to render an object directly {obj}.",
    fix: "Render specific property {obj.name} or JSON.stringify(obj).",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 23,
    tech: 'React',
    level: 'Intermediate',
    error: "Each child in a list should have a unique 'key' prop",
    cause: "Mapping array to elements without key.",
    fix: "Add key={item.id} to wrapper element inside map.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 24,
    tech: 'React',
    level: 'Intermediate',
    error: "Too many re-renders",
    cause: "setState called directly in render body or infinite useEffect loop.",
    fix: "Wrap setState in useEffect or event handler. Check dependencies.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 25,
    tech: 'React',
    level: 'Intermediate',
    error: "Can't perform a React state update on an unmounted component",
    cause: "Async operation finished after component unmounted.",
    fix: "Use cleanup function in useEffect to cancel async task.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 26,
    tech: 'React',
    level: 'Intermediate',
    error: "useEffect dependency array warnings",
    cause: "Missing variables used inside effect in dependency array.",
    fix: "Add missing dependencies or use useRef if value shouldn't trigger run.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 27,
    tech: 'React',
    level: 'Advanced',
    error: "Hydration failed (Next.js)",
    cause: "Server HTML differs from Client HTML (e.g., using window/localStorage on render).",
    fix: "Use useEffect to run client-side only code, or suppress hydration warning.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 28,
    tech: 'React',
    level: 'Advanced',
    error: "Provider not found",
    cause: "Using context hook (useContext) outside of Provider.",
    fix: "Wrap parent component in <Context.Provider>.",
    icon: <SiReact />,
    color: 'text-blue-400'
  },
  {
    id: 29,
    tech: 'React',
    level: 'Expert',
    error: "Performance bottleneck with large lists",
    cause: "Rendering thousands of DOM nodes at once.",
    fix: "Use virtualization (react-window, react-virtuoso).",
    icon: <SiReact />,
    color: 'text-blue-400'
  },

  // --- CSS (Beginner/Intermediate) ---
  {
    id: 30,
    tech: 'CSS',
    level: 'Beginner',
    error: "Center a div horizontally and vertically",
    cause: "Classic CSS struggle.",
    fix: "display: flex; justify-content: center; align-items: center;",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },
  {
    id: 31,
    tech: 'CSS',
    level: 'Beginner',
    error: "z-index doesn't work",
    cause: "Element is static positioned.",
    fix: "Set position: relative (or absolute/fixed/sticky).",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },
  {
    id: 32,
    tech: 'CSS',
    level: 'Beginner',
    error: "Margin collapsing",
    cause: "Vertical margins of adjacent elements merge.",
    fix: "Add padding or border to parent, or use Flexbox/Grid.",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },
  {
    id: 33,
    tech: 'CSS',
    level: 'Intermediate',
    error: "Sticky element not sticking",
    cause: "Parent has overflow: hidden or auto.",
    fix: "Remove overflow property from parent container.",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },
  {
    id: 34,
    tech: 'CSS',
    level: 'Intermediate',
    error: "Flex items overflowing container",
    cause: "Min-width is auto by default.",
    fix: "Set min-width: 0 on flex child.",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },
  {
    id: 35,
    tech: 'CSS',
    level: 'Advanced',
    error: "Cumulative Layout Shift (CLS)",
    cause: "Images connecting without dimensions pushing content.",
    fix: "Set explicit width/height on images/videos.",
    icon: <SiCss3 />,
    color: 'text-purple-400'
  },

  // --- Node.js ---
  {
    id: 36,
    tech: 'Node.js',
    level: 'Beginner',
    error: "EADDRINUSE: address already in use :::3000",
    cause: "Port is taken by another process.",
    fix: "Kill process (npx kill-port 3000) or change port.",
    icon: <SiNodedotjs />,
    color: 'text-green-500'
  },
  {
    id: 37,
    tech: 'Node.js',
    level: 'Intermediate',
    error: "UnhandledPromiseRejectionWarning",
    cause: "Promise rejected but no .catch() handler.",
    fix: "Add .catch() to promise chain or try/catch in async function.",
    icon: <SiNodedotjs />,
    color: 'text-green-500'
  },
  {
    id: 38,
    tech: 'Node.js',
    level: 'Intermediate',
    error: "Error: Can't set headers after they are sent",
    cause: "Sending response (res.json/res.send) twice.",
    fix: "Ensure only one response per request, use return res.send...",
    icon: <SiNodedotjs />,
    color: 'text-green-500'
  },
  {
    id: 39,
    tech: 'Node.js',
    level: 'Advanced',
    error: "JavaScript heap out of memory",
    cause: "Memory leak or process requires more RAM.",
    fix: "Increase max old space: node --max-old-space-size=4096 app.js.",
    icon: <SiNodedotjs />,
    color: 'text-gray-500'
  },

  // --- Git ---
  {
    id: 40,
    tech: 'Git',
    level: 'Beginner',
    error: "git: 'x' is not a git command",
    cause: "Typo in command.",
    fix: "Check 'git --help' for list of commands.",
    icon: <SiGit />,
    color: 'text-orange-500'
  },
  {
    id: 41,
    tech: 'Git',
    level: 'Intermediate',
    error: "fatal: refusing to merge unrelated histories",
    cause: "Merging two unconnected repos.",
    fix: "git pull origin main --allow-unrelated-histories",
    icon: <SiGit />,
    color: 'text-orange-500'
  },
  {
    id: 42,
    tech: 'Git',
    level: 'Intermediate',
    error: "Updates were rejected because the tip of your current branch is behind",
    cause: "Remote has changes you don't have.",
    fix: "git pull before git push.",
    icon: <SiGit />,
    color: 'text-orange-500'
  },
  {
    id: 43,
    tech: 'Git',
    level: 'Advanced',
    error: "Detached HEAD state",
    cause: "Checked out a commit hash directly, not a branch.",
    fix: "git checkout -b new-branch-name to save state.",
    icon: <SiGit />,
    color: 'text-orange-500'
  },
  {
    id: 44,
    tech: 'Git',
    level: 'Expert',
    error: "Merge conflict hell",
    cause: "Divergent changes in same lines.",
    fix: "Use a merge tool (VS Code), resolve manually, then add & commit.",
    icon: <SiGit />,
    color: 'text-orange-500'
  },

  // --- Docker ---
  {
    id: 45,
    tech: 'Docker',
    level: 'Beginner',
    error: "connection refused",
    cause: "Service not running or port not exposed.",
    fix: "Check docker-compose ports mapping, ensure service is UP.",
    icon: <SiDocker />,
    color: 'text-blue-500'
  },
  {
    id: 46,
    tech: 'Docker',
    level: 'Intermediate',
    error: "exec format error",
    cause: "Architecture mismatch (e.g. M1 Mac vs Linux AMD64).",
    fix: "Build with --platform linux/amd64.",
    icon: <SiDocker />,
    color: 'text-blue-500'
  },
  {
    id: 47,
    tech: 'Docker',
    level: 'Intermediate',
    error: "No space left on device",
    cause: "Dangling images/volumes filling disk.",
    fix: "docker system prune -a",
    icon: <SiDocker />,
    color: 'text-blue-500'
  },

  // --- HTML ---
  {
    id: 48,
    tech: 'HTML',
    level: 'Beginner',
    error: "Image not loading (broken icon)",
    cause: "Incorrect src path or file name.",
    fix: "Check file path relative to HTML file. Verify case sensitivity.",
    icon: <SiHtml5 />,
    color: 'text-orange-600'
  },
  {
    id: 49,
    tech: 'HTML',
    level: 'Beginner',
    error: "Form not submitting",
    cause: "Missing button type='submit' or form tags.",
    fix: "Ensure button is inside <form> and has type='submit'.",
    icon: <SiHtml5 />,
    color: 'text-orange-600'
  },

  // --- TypeScript ---
  {
    id: 50,
    tech: 'TypeScript',
    level: 'Beginner',
    error: "Type 'null' is not assignable to type 'string'",
    cause: "Strict null checks enabled.",
    fix: "Allow null in type union: string | null, or check for null.",
    icon: <SiTypescript />,
    color: 'text-blue-600'
  },
  {
    id: 51,
    tech: 'TypeScript',
    level: 'Intermediate',
    error: "Property 'x' does not exist on type 'Object'",
    cause: "Using generic Object type.",
    fix: "Define an interface or type for your object shape.",
    icon: <SiTypescript />,
    color: 'text-blue-600'
  },
  {
    id: 52,
    tech: 'TypeScript',
    level: 'Advanced',
    error: "Type instantiation is excessively deep",
    cause: "Circular type dependency or complex recursive type.",
    fix: "Simplify type utility or use interface to break recursion.",
    icon: <SiTypescript />,
    color: 'text-blue-600'
  },

  // --- SQL (General) ---
  {
    id: 53,
    tech: 'SQL',
    level: 'Beginner',
    error: "Syntax error near ...",
    cause: "Typo in keyword, missing comma.",
    fix: "Check SQL syntax, quote strings with single quotes.",
    icon: <SiPostgresql />,
    color: 'text-blue-300'
  },
  {
    id: 54,
    tech: 'SQL',
    level: 'Intermediate',
    error: "Ambiguous column name 'id'",
    cause: "Joining tables both having 'id' column.",
    fix: "Prefix column with table name/alias: users.id",
    icon: <SiPostgresql />,
    color: 'text-blue-300'
  },
  {
    id: 55,
    tech: 'SQL',
    level: 'Intermediate',
    error: "Violation of PRIMARY KEY constraint",
    cause: "Inserting duplicate ID.",
    fix: "Ensure ID is unique or use auto-increment.",
    icon: <SiPostgresql />,
    color: 'text-blue-300'
  },

  // --- MongoDB ---
  {
    id: 56,
    tech: 'MongoDB',
    level: 'Beginner',
    error: "MongoNetworkError: connection timed out",
    cause: "IP not whitelisted or wrong connection string.",
    fix: "Whitelist IP in Atlas, check credentials.",
    icon: <SiMongodb />,
    color: 'text-green-600'
  },
  {
    id: 57,
    tech: 'MongoDB',
    level: 'Intermediate',
    error: "BSONTypeError: Argument passed in must be a string of 12 bytes...",
    cause: "Invalid ObjectID format.",
    fix: "Validate ID before query, must be 24 hex characters.",
    icon: <SiMongodb />,
    color: 'text-green-600'
  },

  // --- Tailwind CSS ---
  {
    id: 58,
    tech: 'Tailwind',
    level: 'Beginner',
    error: "Classes not applying",
    cause: "Content path missing in tailwind.config.js",
    fix: "Add paths to all template files in config content array.",
    icon: <SiTailwindcss />,
    color: 'text-sky-400'
  },
  {
    id: 59,
    tech: 'Tailwind',
    level: 'Intermediate',
    error: "Dynamic classes not working (bg-{color})",
    cause: "Tailwind can't scan constructed class names.",
    fix: "Map props to complete class names or use safelist.",
    icon: <SiTailwindcss />,
    color: 'text-sky-400'
  },

  // --- More Python ---
  { id: 60, tech: 'Python', level: 'Beginner', error: "SyntaxError: EOL while scanning string literal", cause: "String missing closing quote.", fix: "Close the string with quote.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 61, tech: 'Python', level: 'Beginner', error: "ZeroDivisionError: division by zero", cause: "Dividing number by 0.", fix: "Check denominator is not 0.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 62, tech: 'Python', level: 'Intermediate', error: "UnboundLocalError", cause: "Referencing global variable locally without 'global' keyword.", fix: "Use 'global x' or pass as argument.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 63, tech: 'Python', level: 'Intermediate', error: "FileNotFoundError", cause: "Wrong file path.", fix: "Use absolute path or check CWD.", icon: <SiPython />, color: 'text-blue-500' },

  // --- More JS ---
  { id: 64, tech: 'JavaScript', level: 'Beginner', error: "Unexpected end of input", cause: "Missing closing bracket or parenthesis.", fix: "Count brackets.", icon: <SiJavascript />, color: 'text-yellow-400' },
  { id: 65, tech: 'JavaScript', level: 'Intermediate', error: "Invalid Date", cause: "Parsing bad date string.", fix: "Format date string ISO 8601.", icon: <SiJavascript />, color: 'text-yellow-400' },
  { id: 66, tech: 'JavaScript', level: 'Advanced', error: "Memory Leak", cause: "Event listeners not removed.", fix: "removeEventListener in cleanup.", icon: <SiJavascript />, color: 'text-yellow-400' },

  // --- More React ---
  { id: 67, tech: 'React', level: 'Beginner', error: "Component name must start with uppercase", cause: "Naming component 'myComp'.", fix: "Rename to 'MyComp'.", icon: <SiReact />, color: 'text-blue-400' },
  { id: 68, tech: 'React', level: 'Intermediate', error: "Prop drilling", cause: "Passing props down 5 levels.", fix: "Use Context API or Redux.", icon: <SiReact />, color: 'text-blue-400' },
  { id: 69, tech: 'React', level: 'Advanced', error: "Stale Closure in Hooks", cause: "Effect captures old state.", fix: "Add state to dependency array or use functional update.", icon: <SiReact />, color: 'text-blue-400' },

  // --- More Git ---
  { id: 70, tech: 'Git', level: 'Beginner', error: "nothing to commit, working tree clean", cause: "Forgot to git add.", fix: "git add . then commit.", icon: <SiGit />, color: 'text-orange-500' },
  { id: 71, tech: 'Git', level: 'Intermediate', error: "Aborting commit due to empty commit message", cause: "Closed editor without saving msg.", fix: "Provide message with -m.", icon: <SiGit />, color: 'text-orange-500' },

  // --- More Node ---
  { id: 72, tech: 'Node.js', level: 'Intermediate', error: "Crypto implementation is missing", cause: "Old Node version.", fix: "Upgrade Node.js.", icon: <SiNodedotjs />, color: 'text-green-500' },
  { id: 73, tech: 'Node.js', level: 'Advanced', error: "Event loop lag", cause: "Blocking sync code.", fix: "Use async/await or worker threads.", icon: <SiNodedotjs />, color: 'text-green-500' },

  // --- General Programming ---
  { id: 74, tech: 'General', level: 'Beginner', error: "404 Not Found", cause: "Resource doesn't exist.", fix: "Check URL path.", icon: <SiHtml5 />, color: 'text-gray-400' },
  { id: 75, tech: 'General', level: 'Beginner', error: "500 Internal Server Error", cause: "Server crashed.", fix: "Check server logs.", icon: <SiHtml5 />, color: 'text-gray-400' },
  { id: 76, tech: 'General', level: 'Intermediate', error: "CORS Policy Error", cause: "API domain and Client domain differ.", fix: "Enable CORS on server.", icon: <SiHtml5 />, color: 'text-gray-400' },
  { id: 77, tech: 'General', level: 'Intermediate', error: "Timeout Error", cause: "Request took too long.", fix: "Optimize query or increase timeout.", icon: <SiHtml5 />, color: 'text-gray-400' },

  // --- Padding out to close to 100 with variations ---
  { id: 78, tech: 'Python', level: 'Beginner', error: "TabError: inconsistent use of tabs and spaces", cause: "Mixing indentation.", fix: "Convert all to spaces.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 79, tech: 'JavaScript', level: 'Beginner', error: "Uncaught SyntaxError: Illegal return statement", cause: "Return outside function.", fix: "Put return inside function.", icon: <SiJavascript />, color: 'text-yellow-400' },
  { id: 80, tech: 'React', level: 'Intermediate', error: "Invalid Hook Call", cause: "Hook inside loop/condition.", fix: "Move hook to top level.", icon: <SiReact />, color: 'text-blue-400' },
  { id: 81, tech: 'CSS', level: 'Beginner', error: "Image stretched", cause: "Incorrect aspect ratio.", fix: "object-fit: cover;", icon: <SiCss3 />, color: 'text-purple-400' },
  { id: 82, tech: 'SQL', level: 'Beginner', error: "Column not found", cause: "Typo in col name.", fix: "Check schema.", icon: <SiPostgresql />, color: 'text-blue-300' },
  { id: 83, tech: 'Docker', level: 'Beginner', error: "Container exited with code 1", cause: "App crashed on start.", fix: "docker logs <id>.", icon: <SiDocker />, color: 'text-blue-500' },
  { id: 84, tech: 'Git', level: 'Beginner', error: "Host key verification failed", cause: "SSH key change.", fix: "Remove key from known_hosts.", icon: <SiGit />, color: 'text-orange-500' },
  { id: 85, tech: 'Node.js', level: 'Beginner', error: "npm ERR! code ELIFECYCLE", cause: "Script failed.", fix: "Check error output above.", icon: <SiNodedotjs />, color: 'text-green-500' },
  { id: 86, tech: 'JavaScript', level: 'Intermediate', error: "JSON.parse error", cause: "Parsing invalid JSON.", fix: "Validate JSON structure.", icon: <SiJavascript />, color: 'text-yellow-400' },
  { id: 87, tech: 'Python', level: 'Intermediate', error: "ModuleNotFoundError", cause: "Package not installed.", fix: "pip install package.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 88, tech: 'React', level: 'Intermediate', error: "Nothing was returned from render", cause: "Missing return stmt.", fix: "Return null or JSX.", icon: <SiReact />, color: 'text-blue-400' },
  { id: 89, tech: 'CSS', level: 'Beginner', error: "Scrollbar always visible", cause: "overflow: scroll.", fix: "overflow: auto.", icon: <SiCss3 />, color: 'text-purple-400' },
  { id: 90, tech: 'SQL', level: 'Intermediate', error: "Deadlock found", cause: "Concurrent transactions.", fix: "Retry transaction.", icon: <SiPostgresql />, color: 'text-blue-300' },
  { id: 91, tech: 'Docker', level: 'Intermediate', error: "Bind for 0.0.0.0:80 failed", cause: "Port 80 busy.", fix: "Stop other web server.", icon: <SiDocker />, color: 'text-blue-500' },
  { id: 92, tech: 'Git', level: 'Intermediate', error: "Your local changes would be overwritten by merge", cause: "Uncommitted changes.", fix: "Stash or commit first.", icon: <SiGit />, color: 'text-orange-500' },
  { id: 93, tech: 'Node.js', level: 'Intermediate', error: "ReferenceError: require is not defined", cause: "Using require in ES module.", fix: "Use import or change extension.", icon: <SiNodedotjs />, color: 'text-green-500' },
  { id: 94, tech: 'Python', level: 'Expert', error: "MemoryError", cause: "RAM full.", fix: "Optimize data structures, use generators.", icon: <SiPython />, color: 'text-blue-500' },
  { id: 95, tech: 'JavaScript', level: 'Expert', error: "DataCloneError", cause: "postMessage with non-clonable data.", fix: "Send JSON strings.", icon: <SiJavascript />, color: 'text-yellow-400' },
  { id: 96, tech: 'React', level: 'Expert', error: "Maximum update depth exceeded", cause: "Infinite render loop.", fix: "Check useEffect loops.", icon: <SiReact />, color: 'text-blue-400' },
  { id: 97, tech: 'CSS', level: 'Advanced', error: "Specificity War", cause: "Conflicting rules.", fix: "Use BEM or CSS Modules.", icon: <SiCss3 />, color: 'text-purple-400' },
  { id: 98, tech: 'SQL', level: 'Expert', error: "N+1 Problem", cause: "Too many queries.", fix: "Use JOIN or eager loading.", icon: <SiPostgresql />, color: 'text-blue-300' },
  { id: 99, tech: 'Docker', level: 'Expert', error: "Orphaned containers warning", cause: "Service removed from compose.", fix: "docker-compose up --remove-orphans", icon: <SiDocker />, color: 'text-blue-500' },
  { id: 100, tech: 'Git', level: 'Expert', error: "Submodule out of sync", cause: "Submodule pointer changed.", fix: "git submodule update --init --recursive", icon: <SiGit />, color: 'text-orange-500' },
  { id: 101, tech: 'General', level: 'Beginner', error: "Is it a bug or a feature?", cause: "Undefined spec.", fix: "Read the docs.", icon: <SiHtml5 />, color: 'text-gray-400' }
];
