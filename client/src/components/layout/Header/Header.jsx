import { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "../../forms/SearchInput";
import { useAuth } from "../../../context/Auth";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DropDownToCheckUserOrAdmin from "../../Tailwind components/DropDownToCheckUserOrAdmin";
import { SidebarContext } from "../../../context/SidebarProvider";
import { CartContext } from "../../../context/Cart";
import Badge from "@mui/material/Badge";

const navigation = {
  categories: [
    {
      id: "men",
      name: "Shoes World",
      featured: [
        {
          name: "Sports Shoes",
          slug: "men's-sports-shoes",
          imageSrc: "../../../HeaderImages/Sports.jpg",
          imageAlt: "Top Brand Sports Shoes Images On Unspalsh",
        },
        {
          name: "Casual Shoes",
          slug: "men's-casual-shoes",
          imageSrc: "../../../HeaderImages/Casual.jpg",
          imageAlt: "Top Brand Sports Shoes Images On Unspalsh",
        },

        {
          name: "Formal Shoes",
          slug: "men's-formal-shoes",
          imageSrc: "../../../HeaderImages/Formal.jpg",
          imageAlt: "Top Brand Sports Shoes Images On Unspalsh",
        },
        {
          name: "Mens Slippers & FlipFlop",
          slug: "men's-slippers-and-flipflop",
          imageSrc: "../../../HeaderImages/Slippers.jpg",
          imageAlt: "Top Brand Sports Shoes Images On Unspalsh",
        },
      ],
      sections: [
        {
          id: "Categories",
          name: "Categories",
          items: [
            { name: "Sports Shoes", slug: "men's-sports-shoes" },
            { name: "Casual Shoes", slug: "men's-casual-shoes" },
            { name: "Formal Shoes", slug: "men's-formal-shoes" },
            { name: "Sandls & Flaters", slug: "men's-sandlas-and-floaters" },
            { name: "Ethnic Shoes", slug: "men's-ethnic-shoes" },
            {
              name: "Mens Slippers & FlipFlop",
              slug: "men's-slippers-and-flipflop",
            },
          ],
        },
        {
          id: "FootWear-Types",
          name: "FootWear Types",
          items: [
            { name: "Running Shoes", href: "#" },
            { name: "Sneakers", href: "#" },
            { name: "Loafers", href: "#" },
            { name: "Sandals", href: "#" },
            { name: "Dress Shoes", href: "#" },
            { name: "Hiking Boots", href: "#" },
            { name: "Athletic Shoes", href: "#" },
            { name: "Sportswear", href: "#" },
            { name: "Basketball Shoes", href: "#" },
            { name: "Cross-Training Shoes", href: "#" },
            { name: "Casual Footwear", href: "#" },
            { name: "Formal Shoes", href: "#" },
            { name: "Work Boots", href: "#" },
            { name: "Fashion Sneakers", href: "#" },
            { name: "Flip Flops", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Bata India", href: "#" },
            { name: "Relaxo Footwears", href: "#" },
            { name: "Liberty Shoes", href: "#" },
            { name: "Khadim's", href: "#" },
            { name: "Metro Shoes", href: "#" },
            { name: "Woodland", href: "#" },
            { name: "Puma", href: "#" },
            { name: "Adidas", href: "#" },
            { name: "Nike", href: "#" },
            { name: "Reebok", href: "#" },
            { name: "Skechers", href: "#" },
            { name: "Red Chief", href: "#" },
            { name: "Action Shoes", href: "#" },
            { name: "Lee Cooper", href: "#" },
            { name: "Lakhani Footwear", href: "#" },
          ],
        },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const { cart } = useContext(CartContext);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-white ${
        isSticky ? "fixed top-0 left-0 w-full bg-opacity-95 z-50" : ""
      }`}
    >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.id}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category, index) => (
                      <Tab.Panel
                        key={index}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.slug}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item?.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link
                                to={`/category/${item.slug}`}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) =>
                          section.id === "Categories" ? (
                            <>
                              <div key={section.id}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="font-medium text-gray-900"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.slug} className="flow-root">
                                      <Link
                                        to={`/category/${item.slug}`}
                                        className="-m-2 block p-2 text-gray-500"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <>
                              <div key={section.id}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="font-medium text-gray-900"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item, index) => (
                                    <li key={index} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-2 block p-2 text-gray-500"
                                      >
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )
                        )}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {!auth?.user ? (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Sign Up
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Log In
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <DropDownToCheckUserOrAdmin />
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white ">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-2 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Shoe-Dream</span>
                  <img src="../../../../logo/2_generated2.png" className="h-9 w-auto" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.id} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="z-30"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-4 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-4">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.slug}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            to={`/category/${item.slug}`}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) =>
                                        section.id === "Categories" ? (
                                          <>
                                            <div key={section.id}>
                                              <p
                                                id={`${section.name}-heading`}
                                                className="font-medium text-gray-900"
                                              >
                                                {section.name}
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`${section.name}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {section.items.map((item) => (
                                                  <li
                                                    key={item.slug}
                                                    className="flex"
                                                  >
                                                    <Link
                                                      to={`/category/${item.slug}`}
                                                      className="hover:text-gray-800"
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div key={section.name}>
                                              <p
                                                id={`${section.name}-heading`}
                                                className="font-medium text-gray-900"
                                              >
                                                {section.name}
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`${section.name}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {section.items.map(
                                                  (item, index) => (
                                                    <li
                                                      key={index}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={item.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          </>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              {/* Search */}
              <div className="flex lg:ml-5">
                <Link className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                <SearchInput />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!auth?.user ? (
                    <>
                      <Link
                        to="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign Up
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Log In
                      </Link>
                    </>
                  ) : (
                    <>
                      <DropDownToCheckUserOrAdmin />
                    </>
                  )}
                </div>

                {/* Cart */}
                <div
                  className="ml-4 flow-root lg:ml-6"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Badge badgeContent={cart?.length} color="error" size="large">
                    {cart?.length === 0 ? (
                      <ShoppingCartOutlinedIcon />
                    ) : (
                      <ShoppingCartIcon />
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"></span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
