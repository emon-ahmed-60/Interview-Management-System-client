export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Interview Management System
      </div>
    </footer>
  );
}
