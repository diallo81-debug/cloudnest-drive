import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Upload, 
  Moon, 
  Sun, 
  Bell, 
  LogOut,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { useFileStore } from '@/stores/fileStore';

interface TopBarProps {
  onUploadClick: () => void;
}

export function TopBar({ onUploadClick }: TopBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { searchQuery, setSearchQuery } = useFileStore();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between gap-4">
      {/* Search */}
      <motion.div 
        className="relative flex-1 max-w-xl"
        animate={{ scale: isSearchFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search files and folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="pl-10 bg-secondary/50 border-transparent focus:border-primary focus:bg-background transition-all"
        />
      </motion.div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Upload Button */}
        <Button 
          onClick={onUploadClick}
          className="gradient-primary shadow-glow"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <motion.button
          className="p-2 rounded-lg hover:bg-secondary transition-colors relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
        </motion.button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || 'User'}</span>
                <span className="text-sm text-muted-foreground font-normal">
                  {user?.email || 'user@example.com'}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
