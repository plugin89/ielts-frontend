import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";

export function LoginButton() {
  const { currentUser, login, logout } = useAuth();

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span>{currentUser.displayName || currentUser.email}</span>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={login} variant="default">
      <LogIn className="h-4 w-4" />
      Login with Google
    </Button>
  );
}