import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Link, Copy, Check, Users, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileItem } from '@/stores/fileStore';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
}

interface SharedUser {
  id: string;
  email: string;
  name: string;
  permission: 'view' | 'edit';
}

export function ShareModal({ isOpen, onClose, file }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [copied, setCopied] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    { id: '1', email: 'john@example.com', name: 'John Doe', permission: 'edit' },
    { id: '2', email: 'jane@example.com', name: 'Jane Smith', permission: 'view' },
  ]);

  const handleShare = () => {
    if (!email.trim()) return;
    
    const newUser: SharedUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: email.trim(),
      name: email.split('@')[0],
      permission,
    };
    
    setSharedUsers([...sharedUsers, newUser]);
    setEmail('');
  };

  const removeUser = (id: string) => {
    setSharedUsers(sharedUsers.filter((u) => u.id !== id));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://cloudnest.app/share/${file?.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share "{file.name}"
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share with people */}
          <div className="space-y-3">
            <Label>Share with people</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={permission} onValueChange={(v) => setPermission(v as 'view' | 'edit')}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleShare} disabled={!email.trim()}>
                Share
              </Button>
            </div>
          </div>

          {/* Shared Users */}
          {sharedUsers.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                People with access
              </Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {sharedUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user.permission}
                    </span>
                    <button
                      onClick={() => removeUser(user.id)}
                      className="p-1 hover:bg-background rounded"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Copy Link */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Get shareable link
            </Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`https://cloudnest.app/share/${file.id}`}
                className="flex-1 bg-secondary/50"
              />
              <Button variant="outline" onClick={copyLink}>
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
