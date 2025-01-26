import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Wishio</h2>
            <p>Делайте подарки, которые действительно нужны.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">О нас</Link>
              </li>
              <li>
                <Link href="/how-it-works">Как это работает</Link>
              </li>
              <li>
                <Link href="/privacy">Конфиденциальность</Link>
              </li>
              <li>
                <Link href="/terms">Условия использования</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p>Email: support@wishio.com</p>
            <p>Телефон: +7 (999) 123-45-67</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">
              Подписаться на новости
            </h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Ваш email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Wishio. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
