"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  UserIcon, 
  PlayIcon, 
  FolderIcon, 
  WrenchScrewdriverIcon, 
  EnvelopeIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/#about", icon: UserIcon },
  { 
    name: "Interactive Experience", 
    href: "http://localhost:3001/simulator", 
    icon: PlayIcon 
  },
  {
    name: "Projects",
    href: "/#projects",
    icon: FolderIcon,
    children: [
      { name: "Chat Collect", href: "https://chatcollect.com", icon: FolderIcon },
      { name: "Magic UI", href: "https://magicui.design", icon: FolderIcon },
      { name: "llm.report", href: "https://llm.report", icon: FolderIcon },
      { name: "Automatic Chat", href: "https://automatic.chat", icon: FolderIcon },
    ]
  },
  { name: "Skills", href: "/#skills", icon: WrenchScrewdriverIcon },
  { name: "Contact", href: "/#contact", icon: EnvelopeIcon },
];

export default function DropdownNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const isActive = (href: string) => {
    if (href.startsWith("http")) return false; // External links
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">NL</span>
              </div>
              <span className="font-semibold text-lg">Naoise Law</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" ref={dropdownRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className={cn(
                          "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          activeDropdown === item.name && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDownIcon 
                          className={cn(
                            "w-4 h-4 transition-transform",
                            activeDropdown === item.name && "rotate-180"
                          )} 
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-lg z-50">
                          <div className="py-1">
                            <Link
                              href={item.href}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <item.icon className="w-4 h-4" />
                              <span>View All {item.name}</span>
                            </Link>
                            <div className="border-t border-border my-1"></div>
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                target={child.href.startsWith("http") ? "_blank" : undefined}
                                rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <child.icon className="w-4 h-4" />
                                <span>{child.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md border-t border-border">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDownIcon 
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === item.name && "rotate-180"
                        )} 
                      />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="pl-6 space-y-1">
                        <Link
                          href={item.href}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>View All {item.name}</span>
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            target={child.href.startsWith("http") ? "_blank" : undefined}
                            rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            <child.icon className="w-4 h-4" />
                            <span>{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive(item.href) && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
