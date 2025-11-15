'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X } from 'lucide-react'

interface Navigation {
  name: string
  href: string
}

export default function MobileMenu({ navigation }: { navigation: Navigation[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-900" />
      </button>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <span className="font-bold text-lg text-gray-900">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          <div className="p-6 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
