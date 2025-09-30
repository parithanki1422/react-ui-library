import { useState, useEffect } from "react";
import {
  Pagination,
  Grid,
  PrimaryButton,
  SecondaryButton,
  Sidebar,
  Navigation,
  Input,
  Select,
  Checkbox,
  Toggle,
  Card,
  Tooltip,
  Tabs,
  Accordion,
  Badge,
  Modal,
  Alert,
  Avatar,
  ProgressBar,
  Skeleton,
  Spinner,
  Rating,
  convertUTCToLocal,
  Breadcrumb,
  Stepper,
  DatePicker,
  Timeline,
  RadioGroup,
  Slider,
  FileUpload,
  ListGroup,
  Carousel,
  Form,
  MultiSelect,
  DateTimePicker
} from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Code copied to clipboard!");
};

const componentMap = () => ({
  PrimaryButton: {
    description: "Primary button used for main actions.",
    preview: <PrimaryButton onClick={() => { }}>Primary</PrimaryButton>,
    code: `<PrimaryButton onClick={() => {})}>Primary</PrimaryButton>`,
  },
  SecondaryButton: {
    description: "Secondary button for less important actions.",
    preview: <SecondaryButton onClick={() => { }}>Secondary</SecondaryButton>,
    code: `<SecondaryButton onClick={() => {}}>Secondary</SecondaryButton>`,
  },
  Input: {
    description: "Text input field with label.",
    preview: (<div className="space-y-2">
      <Input label="Name" placeholder="Type here..." />
      <Input label="Password" type="password" placeholder="Type here..." />
    </div>),
    code: `<Input label="Name" placeholder="Type here..." />`,
  },
  Select: {
    description: "Dropdown for selecting options.",
    preview: (
      <Select
        label="Role"
        options={[
          { label: "Admin", value: "Admin" },
          { label: "Developer", value: "Developer" },
        ]}
      />
    ),
    code: `<Select label="Role" options={[{ label: "Admin", value: "Admin" }, { label: "Developer", value: "Developer" }]} />`,
  },
  Checkbox: {
    description: "Checkbox with label.",
    preview: <Checkbox label="Accept Terms" />,
    code: `<Checkbox label="Accept Terms" />`,
  },
  Toggle: {
    description: "Toggle switch for enabling or disabling settings or features.",
    preview: (() => {
      const [checked, setChecked] = useState(false);
      return (
        <Toggle
          label="Email Notifications"
          checked={checked}
          onChange={setChecked}
        />
      );
    })(),
    code: `
const [checked, setChecked] = useState(false);
<Toggle  label="Email Notifications" checked={checked} onChange={setChecked} />`,
  },
  Grid: {
    description: "Data grid with columns and rows.",
    preview: (
      <Grid
        columns={[
          { label: "ID", accessor: "id" },
          { label: "Name", accessor: "name" },
          { label: "Email", accessor: "email" },
          { label: "Role", accessor: "role" },
          { label: "Login Time", accessor: "loginTime" },
        ]}
        data={[
          { id: 1, name: "Seema Patel", email: "seema@example.com", role: "Admin", loginTime: convertUTCToLocal("2025-09-24T10:00:00Z") },
          { id: 2, name: "John Doe", email: "john@example.com", role: "Developer", loginTime: convertUTCToLocal("2025-09-24T15:30:00Z") },
          { id: 3, name: "Aditi Sharma", email: "aditi@example.com", role: "Designer", loginTime: convertUTCToLocal("2025-09-25T08:00:00Z") },
          { id: 4, name: "Rohan Singh", email: "rohan@example.com", role: "Tester", loginTime: convertUTCToLocal("2025-09-26T05:15:00Z") },
          { id: 5, name: "Meera Patel", email: "meera@example.com", role: "Developer", loginTime: convertUTCToLocal("2025-09-27T12:45:00Z") },
        ]}
      />
    ),
    code: `
<Grid
 columns={[
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
]}
data={[
  { id: 1, name: "Seema Patel", email: "seema@example.com", role: "Admin" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "Developer" },
  { id: 3, name: "Aditi Sharma", email: "aditi@example.com", role: "Designer" },
  { id: 4, name: "Rohan Singh", email: "rohan@example.com", role: "Tester" },
  { id: 5, name: "Meera Patel", email: "meera@example.com", role: "Developer" },
]}
/>`,
  },
  Pagination: {
    description: "Pagination component for navigating pages.",
    preview: (() => {
      const [page, setPage] = useState(1);
      return <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />;
    })(),
    code: `<Pagination totalPages={5} currentPage={page} onPageChange={setPage} />`,
  },
  Sidebar: {
    description: "Sidebar navigation with nested items.",
    preview: (
      <div className="h-64 border rounded-lg overflow-auto">
        <Sidebar
          links={[
            { label: "Dashboard", children: [{ label: "Analytics" }, { label: "Reports" }] },
            { label: "Projects", children: [{ label: "Active" }, { label: "Archived" }] },
          ]}
        />
      </div>
    ),
    code: `<Sidebar links={[{ label: "Dashboard", children: [{ label: "Analytics" }, { label: "Reports" }] }]} />`,
  },
  MegaMenu: {
    description: "Mega Menu navigation bar with dropdown sections and submenu items.",
    preview: (
      <Navigation
        menu={[
          {
            label: "Products",
            children: [
              {
                label: "Laptops",
                items: [
                  { label: "Gaming Laptops", href: "#" },
                  { label: "Business Laptops", href: "#" },
                  { label: "2-in-1 Laptops", href: "#" },
                ],
              },
              {
                label: "Mobiles",
                items: [
                  { label: "Smartphones", href: "#" },
                  { label: "Feature Phones", href: "#" },
                  { label: "Refurbished Phones", href: "#" },
                ],
              },
              {
                label: "Accessories",
                items: [
                  { label: "Headphones", href: "#" },
                  { label: "Chargers", href: "#" },
                  { label: "Keyboards", href: "#" },
                ],
              },
            ],
          },
          {
            label: "Services",
            children: [
              {
                label: "Support",
                items: [
                  { label: "Warranty", href: "#" },
                  { label: "Repairs", href: "#" },
                  { label: "Installation", href: "#" },
                ],
              },
              {
                label: "Consulting",
                items: [
                  { label: "IT Consulting", href: "#" },
                  { label: "Cloud Services", href: "#" },
                ],
              },
            ],
          },
          {
            label: "Resources",
            children: [
              {
                label: "Documentation",
                items: [
                  { label: "API Docs", href: "#" },
                  { label: "User Guides", href: "#" },
                ],
              },
              {
                label: "Community",
                items: [
                  { label: "Blog", href: "#" },
                  { label: "Forum", href: "#" },
                  { label: "Events", href: "#" },
                ],
              },
            ],
          },
          {
            label: "About Us",
            children: [
              {
                label: "Company",
                items: [
                  { label: "Our Story", href: "#" },
                  { label: "Team", href: "#" },
                ],
              },
              {
                label: "Careers",
                items: [
                  { label: "Open Positions", href: "#" },
                  { label: "Internships", href: "#" },
                ],
              },
            ],
          },
        ]}
      />
    ),
    code: `<Navigation menu={[
          {
            label: "Products",
            children: [
              {
                label: "Laptops",
                items: [
                  { label: "Gaming Laptops", href: "#" },
                  { label: "Business Laptops", href: "#" },
                  { label: "2-in-1 Laptops", href: "#" },
                ],
              },
              {
                label: "Mobiles",
                items: [
                  { label: "Smartphones", href: "#" },
                  { label: "Feature Phones", href: "#" },
                  { label: "Refurbished Phones", href: "#" },
                ],
              },
              {
                label: "Accessories",
                items: [
                  { label: "Headphones", href: "#" },
                  { label: "Chargers", href: "#" },
                  { label: "Keyboards", href: "#" },
                ],
              },
            ],
          },
          {
            label: "Services",
            children: [
              {
                label: "Support",
                items: [
                  { label: "Warranty", href: "#" },
                  { label: "Repairs", href: "#" },
                  { label: "Installation", href: "#" },
                ],
              },
              {
                label: "Consulting",
                items: [
                  { label: "IT Consulting", href: "#" },
                  { label: "Cloud Services", href: "#" },
                ],
              },
            ],
          },
          {
            label: "Resources",
            children: [
              {
                label: "Documentation",
                items: [
                  { label: "API Docs", href: "#" },
                  { label: "User Guides", href: "#" },
                ],
              },
              {
                label: "Community",
                items: [
                  { label: "Blog", href: "#" },
                  { label: "Forum", href: "#" },
                  { label: "Events", href: "#" },
                ],
              },
            ],
          },
          {
            label: "About Us",
            children: [
              {
                label: "Company",
                items: [
                  { label: "Our Story", href: "#" },
                  { label: "Team", href: "#" },
                ],
              },
              {
                label: "Careers",
                items: [
                  { label: "Open Positions", href: "#" },
                  { label: "Internships", href: "#" },
                ],
              },
            ],
          },
        ]} />`,
  },
  Tooltip: {
    description: "Show extra info on hover.",
    preview: <Tooltip label="Tooltip Text"><button className="px-4 py-2 bg-blue-600 text-white rounded">Hover Me</button></Tooltip>,
    code: `<Tooltip label="Tooltip Text"><button>Hover Me</button></Tooltip>`,
  },
  Card: {
    description: "Card component to show content or UI blocks.",
    preview: (
      <Card>
        <h3 className="font-bold text-lg mb-2">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-300">This is a simple card description.</p>
      </Card>
    ),
    code: `<Card>
<h3 className="font-bold text-lg mb-2">Card Title</h3>
<p>This is a simple card description.</p>
</Card>`,
  },
  Tabs: {
    description: "Tabs to switch between content sections.",
    preview: (
      <Tabs
        tabs={[
          { label: "Tab 1", content: <p>Content 1</p> },
          { label: "Tab 2", content: <p>Content 2</p> },
          { label: "Tab 3", content: <p>Content 3</p> },
        ]}
      />
    ),
    code: `<Tabs tabs={[{ label: "Tab 1", content: <p>Content 1</p> }, { label: "Tab 2", content: <p>Content 2</p> }]} />`,
  },
  Accordion: {
    description: "Collapsible content section.",
    preview: (
      <Accordion title="Section 1">
        <p>This is hidden content inside the accordion.</p>
      </Accordion>
    ),
    code: `<Accordion title="Section 1"><p>Hidden content</p></Accordion>`,
  },
  Badge: {
    description: "Small badge/notification indicator.",
    preview: (
      <div className="gap-2 flex">
        <Badge>New</Badge>
        <Badge color="green">New</Badge>
        <Badge color="blue">New</Badge>
        <Badge color="gray">New</Badge>
      </div>
    ),
    code: `<Badge>New</Badge>
<Badge color="green">New</Badge>
<Badge color="blue">New</Badge>
<Badge color="gray">New</Badge>`,
  },
  Modal: {
    description: "Modal dialog for showing important content.",
    preview: (
      <Modal triggerLabel="Open Modal" title="Welcome">
        <p>This is a modal content example.</p>
      </Modal>
    ),
    code: `<Modal triggerLabel="Open Modal" title="Welcome">
<p>This is a modal content example.</p>
</Modal>`,
  },
  Alert: {
    description: "Displays contextual messages like info, success, warning, or error.",
    preview: (
      <div className="space-y-2">
        <Alert type="info" message="This is an info alert" />
        <Alert type="success" message="Action successful!" />
        <Alert type="warning" message="Be careful with this step." />
        <Alert type="error" message="Something went wrong." />
      </div>
    ),
    code: `<Alert type="info" message="This is an info alert" />
<Alert type="success" message="Action successful!" />
<Alert type="warning" message="Be careful with this step." />
<Alert type="error" message="Something went wrong." />`,
  },
  Avatar: {
    description: "Shows a user image or initials inside a circular container.",
    preview: (
      <div className="flex gap-4">
        <Avatar alt="Meera Patel" />
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="John Doe" />
      </div>
    ),
    code: `<Avatar alt="Meera Patel" />\n<Avatar src="https://i.pravatar.cc/150?img=3" alt="John Doe" size="16" />`,
  },
  ProgressBar: {
    description: "Visual indicator of progress for a task or process.",
    preview: <ProgressBar value={65} />,
    code: `<ProgressBar value={65} />`,
  },
  Skeleton: {
    description: "Loading placeholder used while content is being fetched.",
    preview: (
      <div className="space-y-2 w-64">
        <Skeleton width="w-3/4" />
        <Skeleton />
        <Skeleton width="w-1/2" />
      </div>
    ),
    code: `<Skeleton width="w-3/4" />\n<Skeleton />\n<Skeleton width="w-1/2" />`,
  },
  Spinner: {
    description: "Loading spinner to indicate ongoing operations.",
    preview: <Spinner />,
    code: `<Spinner />`,
  },
  Rating: {
    description: "Interactive heart rating with half-heart support.",
    preview: (() => {
      const [rating, setRating] = useState(2.5);
      return <Rating value={rating} max={5} onChange={setRating} />;
    })(),
    code: `
const [rating, setRating] = useState(2.5);
<Rating value={rating} max={5} onChange={setRating} />`,
  },
  Breadcrumb: {
    description: "Navigation path indicator using Font Awesome icons.",
    preview: (
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Library", href: "/library" },
          { label: "Components" },
        ]}
      />
    ),
    code: `
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Components" },
  ]}
/>
  `,
  },
  Timeline: {
    description: "Timeline to show chronological events.",
    preview: (
      <Timeline
        events={[
          { time: "09:00 AM", content: "User signed up", completed: true },
          { time: "10:30 AM", content: "User verified email", completed: false },
          { time: "12:00 PM", content: "User made first purchase", completed: false },
        ]}
      />
    ),
    code: `<Timeline
  events={[
    { time: "09:00 AM", content: "User signed up" },
    { time: "10:30 AM", content: "User verified email" },
    { time: "12:00 PM", content: "User made first purchase" },
  ]}
/>`,
  },
  Stepper: {
    description: "Stepper to show progress through steps.",
    preview: <Stepper steps={["Login", "Shipping", "Payment", "Confirm"]} currentStep={2} />,
    code: `<Stepper steps={["Login", "Shipping", "Payment", "Confirm"]} currentStep={2} />`,
  },
  DatePicker: {
    description: "Date picker input for selecting dates.",
    preview: <DatePicker
      label="Start Date"
      onChange={(date) => console.log("Selected Date:", date)}
      disablePast={true}
    />,
    code: `<DatePicker value={date} onChange={setDate} />`,
  },
  RadioGroup: {
    description: "Select one option from multiple choices.",
    preview: (() => {
      const [gender, setGender] = useState("male");
      return (
        <RadioGroup
          label="Select Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          value={gender}
          onChange={setGender}
        />
      );
    })(),
    code: `
const [gender, setGender] = useState("male");
<RadioGroup label="Select Gender" 
options={[{ label: "Male", value: "male" }, 
{ label: "Female", value: "female" }, 
{ label: "Other", value: "other" }]}
value={gender} onChange={setGender} />`,
  },
  Slider: {
    description: "Adjust numeric value using a slider control.",
    preview: (() => {
      const [volume, setVolume] = useState(50);
      return <Slider label="Volume" min={0} max={100} value={volume} onChange={setVolume} />;
    })(),
    code: `
const [volume, setVolume] = useState(50);
<Slider label="Volume" min={0} max={100} value={volume} onChange={setVolume} />`,
  },
  FileUpload: {
    description: "Upload a file using a custom styled input.",
    preview: <FileUpload onChange={(file) => console.log("Selected file:", file)} />,
    code: `<FileUpload onChange={(file) => console.log("Selected file:", file)} />`,
  },
  ListGroup: {
    description: "List of selectable items.",
    preview: (() => {
      const [selected, setSelected] = useState("Item 1");
      return (
        <ListGroup
          items={["Item 1", "Item 2", "Item 3", "Item 4"]}
          selected={selected}
          onSelect={setSelected}
        />
      );
    })(),
    code: `
const [selected, setSelected] = useState("Item 1");
<ListGroup
  items={["Item 1", "Item 2", "Item 3", "Item 4"]}
  selected={selected}
  onSelect={setSelected}
/>
  `,
  },
  Carousel: {
    description: "Image carousel with auto-sliding and navigation controls.",
    preview: (
      <Carousel
        images={[
          "https://picsum.photos/id/1015/800/600",
          "https://picsum.photos/id/1016/800/600",
          "https://picsum.photos/id/1018/800/600",
          "https://picsum.photos/id/1020/800/600",
        ]}
        interval={4000}
        heightClass="h-64"
      />
    ),
    code: `
<Carousel
  images={[
    "https://picsum.photos/id/1015/800/600",
    "https://picsum.photos/id/1016/800/600",
    "https://picsum.photos/id/1018/800/600",
    "https://picsum.photos/id/1020/800/600",
  ]}
  interval={4000}
  heightClass="h-64"
/>
  `,
  },
  Form: {
    description: "Dynamic form builder component to generate forms from config.",
    preview: (() => {
      const userFormFields = [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          required: true,
          placeholder: "Enter your full name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          placeholder: "Enter your email address",
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          placeholder: "Enter your age",
        },
        {
          name: "bio",
          label: "Bio",
          type: "textarea",
          placeholder: "Write something about yourself...",
        },
      ];

      return (
        <Form
          fields={userFormFields}
          onSubmit={(data) => console.log("Form Submitted: " + JSON.stringify(data, null, 2))}
        />
      );
    })(),
    code: `
const userFormFields = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter your email address" },
  { name: "age", label: "Age", type: "number", placeholder: "Enter your age" },
  { name: "bio", label: "Bio", type: "textarea", placeholder: "Write something about yourself..." },
];

<Form fields={userFormFields} onSubmit={(data) => console.log(data)} />`,
  },
  MultiSelect: {
    description: "Select multiple options from a dropdown.",
    preview: (() => {
      const [selected, setSelected] = useState([]);

      const handleChange = (values) => {
        setSelected(values);
        console.log("Selected values:", values);
      };

      return (
        <div className="space-y-2">
          <MultiSelect
            label="Select Fruits"
            options={["Apple", "Banana", "Orange", "Mango"]}
            onChange={handleChange}
          />
        </div>
      );
    })(),
    code: `
const [selected, setSelected] = useState([]);
const handleChange = (values) => {
  setSelected(values);
  console.log("Selected values:", values);
};
<MultiSelect
  label="Select Fruits"
  options={["Apple", "Banana", "Orange", "Mango"]}
  onChange={handleChange}
/>`
  },
  DateTimePicker: {
    description: "Pick a date and time with a calendar and time input.",
    preview: (() => {
      const handleDateTimeChange = (value) => {
        console.log("Selected DateTime:", value);
      };

      return (
        <div className="w-72">
          <DateTimePicker
            label="Schedule Meeting"
            onChange={handleDateTimeChange}
          />
        </div>
      );
    })(),
    code: `
import DateTimePicker from "./components/DateTimePicker";

<DateTimePicker
  label="Schedule Meeting"
  onChange={(value) => console.log("Selected DateTime:", value)}
/>
    `,
  },
});

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState("PrimaryButton");
  const [darkMode, setDarkMode] = useState(false);

  const components = componentMap(false, () => { });
  const ComponentInfo = components[selectedComponent];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen font-sans bg-white text-black dark:bg-gray-900 dark:text-white">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
          <h1 className="text-xl font-bold">📚 UI Library</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.keys(components).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedComponent(key)}
              className={`
                flex items-center w-full px-4 py-2 text-md font-medium rounded-none border-l-4 transition
                ${selectedComponent === key
                  ? "border-blue-600 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-white"
                  : "border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                }
              `}
            >
              {key}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto relative">
        <div
          className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-black-400 dark:text-yellow-400" />
        </div>

        <h2 className="text-2xl font-bold mb-2">{selectedComponent}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{ComponentInfo.description}</p>

        <div className="mb-6 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          {ComponentInfo.preview}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Code Example</h3>
            <button
              onClick={() => copyToClipboard(ComponentInfo.code)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Copy
            </button>
          </div>
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{ComponentInfo.code}</code>
          </pre>
        </div>
      </main>
    </div>
  );
}
