import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/shared/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { NavLink } from 'react-router-dom'

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    to: string
    variant: 'default' | 'ghost'
  }[]
}

function SidebarComponent({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={link.to}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}

                  // className={({ isActive }) =>
                  //   [ isActive  &&cn(
                  //   buttonVariants({ variant: link.variant, size: 'icon' }),
                  //   'h-9 w-9',
                  //   link.variant === 'default' &&
                  //     'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  // )].join(' ')}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                [
                  isActive
                    ? cn(
                        buttonVariants({ variant: link.variant, size: 'sm' }),
                        link.variant === 'default' &&
                          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                        'justify-start',
                      )
                    : cn(
                        buttonVariants({ variant: link.variant, size: 'sm' }),
                        link.variant === 'default' &&
                          'dark:bg-transparent dark:text-white dark:hover:bg-muted dark:hover:text-white',
                        'justify-start',
                      ),
                ].join(' ')
              }>
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white',
                  )}>
                  {link.label}
                </span>
              )}
            </NavLink>
          ),
        )}
      </nav>
    </div>
  )
}

export default SidebarComponent
