import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Users, 
  Clock, 
  Trash2, 
  Settings, 
  Star,
  ChevronLeft,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { useFileStore } from '@/stores/fileStore';
import { Progress } from '@/components/ui/progress';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
  badge?: number;
}

function NavItem({ icon: Icon, label, isActive, isCollapsed, onClick, badge }: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
        'hover:bg-sidebar-accent group relative',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
      )}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className={cn(
        'h-5 w-5 flex-shrink-0 transition-colors',
        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
      )} />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {badge && !isCollapsed && (
        <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </motion.button>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('my-files');
  const { storageUsed, storageLimit } = useFileStore();

  const storagePercentage = (storageUsed / storageLimit) * 100;

  const navItems = [
    { id: 'my-files', icon: FolderOpen, label: 'My Files' },
    { id: 'shared', icon: Users, label: 'Shared with Me', badge: 3 },
    { id: 'starred', icon: Star, label: 'Starred' },
    { id: 'recent', icon: Clock, label: 'Recent' },
    { id: 'trash', icon: Trash2, label: 'Trash' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 260 }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Logo size="sm" showText={!isCollapsed} />
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.id)}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Storage Usage */}
      <div className="p-4 border-t border-sidebar-border">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HardDrive className="h-4 w-4" />
                <span>Storage</span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {formatBytes(storageUsed)} of {formatBytes(storageLimit)} used
              </p>
              <button className="w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Upgrade Plan
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="relative">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div 
                  className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary"
                  style={{ opacity: storagePercentage / 100 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <NavItem
          icon={Settings}
          label="Settings"
          isCollapsed={isCollapsed}
          onClick={() => setActiveItem('settings')}
          isActive={activeItem === 'settings'}
        />
      </div>
    </motion.aside>
  );
}
