export default function WishPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold">WishList</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Главная страница
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Списки желаний
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Настройка профиля
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 ">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Найди-ка..."
              className="px-4 py-2 border rounded bg-gray-50 text-sm text-gray-600 "
            />
          </div>
          <div className="flex items-center ">
            <button className="w-20 h-10 bg-gray-200 rounded"></button>
          </div>
        </header>
      </div>
    </div>
  );
}
