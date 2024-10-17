import { useState } from 'react'

import { Inbox } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import { Separator } from '@radix-ui/react-dropdown-menu'
import SidebarComponent from './sidebar'
import { Outlet } from 'react-router-dom'

interface MailProps {
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

function MainComponent({
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
          sizes,
        )}`
      }}
      className="max-h-[93vh] items-stretch">
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`
        }}
        onResize={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`
        }}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
        )}>
        <Separator />
        <SidebarComponent
          isCollapsed={isCollapsed}
          links={[
            {
              title: 'Home',
              label: '',
              icon: Inbox,
              variant: 'default',
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <main className="flex flex-1 flex-col w-full">
          <Outlet />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MainComponent
