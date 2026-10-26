'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  FileText,
  Briefcase,
  CheckSquare,
  Calendar,
  Bell,
  Building2,
  Users,
  FileSpreadsheet,
  Megaphone,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  role: 'STUDENT' | 'ADMIN' | 'COMPANY';
  userName?: string;
  userEmail?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  userName = 'User',
  userEmail = '',
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  };

  const studentLinks = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/profile', label: 'Academic Profile', icon: GraduationCap },
    { href: '/student/resumes', label: 'My Resumes', icon: FileText },
    { href: '/student/drives', label: 'Placement Drives', icon: Briefcase },
    { href: '/student/applications', label: 'My Applications', icon: CheckSquare },
    { href: '/student/interviews', label: 'Interview Schedule', icon: Calendar },
    { href: '/student/notifications', label: 'Notifications', icon: Bell },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Student Directory', icon: Users },
    { href: '/admin/companies', label: 'Companies & Recruiters', icon: Building2 },
    { href: '/admin/drives', label: 'Placement Drives', icon: Briefcase },
    { href: '/admin/applicants', label: 'Applicant Pipeline', icon: CheckSquare },
    { href: '/admin/interviews', label: 'Interview Scheduling', icon: Calendar },
    { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { href: '/admin/reports', label: 'Reports & Analytics', icon: FileSpreadsheet },
  ];

  const companyLinks = [
    { href: '/company/dashboard', label: 'Company Overview', icon: LayoutDashboard },
    { href: '/company/profile', label: 'Company Profile', icon: Building2 },
    { href: '/company/drives', label: 'Placement Drives', icon: Briefcase },
    { href: '/company/applicants', label: 'Candidate Review', icon: Users },
  ];

  const links =
    role === 'ADMIN' ? adminLinks : role === 'COMPANY' ? companyLinks : studentLinks;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 bg-slate-950/70">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
                CAMPUS<span className="text-blue-400 font-extrabold">CPM</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                Placement System
              </span>
            </div>
          </Link>
        </div>

        {/* User Role Badge */}
        <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspace
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                role === 'ADMIN'
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                  : role === 'COMPANY'
                  ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                  : 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
              }`}
            >
              {role === 'ADMIN' ? 'Officer / Admin' : role === 'COMPANY' ? 'Recruiter' : 'Student Portal'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {links.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
              </Link>
            );
          })}
        </div>

        {/* Bottom User info and Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0 flex-1 mr-2">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-xs text-slate-400 truncate">{userEmail}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
