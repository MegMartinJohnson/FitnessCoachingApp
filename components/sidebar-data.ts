import { BarChart3, Calendar, Clock, Heart, Home, MessageSquare, PillIcon as Pills, Settings, Users, Dumbbell, FileText, User, CreditCard, LogOut, Palette, UserCog, Activity, ScrollText, UsersRound, Briefcase } from 'lucide-react'

export type SidebarItem = {
  title: string
  icon: any
  href: string
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export const coachSections: SidebarSection[] = [
  {
    title: "Client Management",
    items: [
      { title: "Dashboard", icon: Home, href: "/coach" },
      { title: "Clients", icon: Users, href: "/coach/clients" },
      { title: "Progress", icon: Activity, href: "/coach/progress" },
      { title: "Messages", icon: MessageSquare, href: "/coach/messages" },
      { title: "Community", icon: UsersRound, href: "/coach/community" },
    ],
  },
  {
    title: "Program Management",
    items: [
      { title: "Training", icon: Dumbbell, href: "/coach/training" },
      { title: "Cardio", icon: Heart, href: "/coach/cardio" },
      { title: "Nutrition", icon: Calendar, href: "/coach/nutrition" },
      { title: "Supplements", icon: Pills, href: "/coach/supplements" },
      { title: "Habits", icon: Clock, href: "/coach/habits" },
      { title: "Metrics", icon: BarChart3, href: "/coach/metrics" },
      { title: "Submissions", icon: ScrollText, href: "/coach/submissions" },
      { title: "Resources", icon: FileText, href: "/coach/resources" },
    ],
  },
  {
    title: "Business Management",
    items: [
      { title: "Analytics", icon: BarChart3, href: "/coach/analytics" },
      { title: "Payments", icon: CreditCard, href: "/coach/payments" },
      { title: "Onboarding", icon: UserCog, href: "/coach/onboarding" },
      { title: "Branding", icon: Palette, href: "/coach/branding" },
    ],
  },
  {
    title: "Account Management",
    items: [
      { title: "Settings", icon: Settings, href: "/coach/settings" },
      { title: "Switch to Client", icon: User, href: "/client" },
      { title: "Log Out", icon: LogOut, href: "/logout" },
    ],
  },
]

export const clientSections: SidebarSection[] = [
  {
    title: "Program Management",
    items: [
      { title: "Dashboard", icon: Home, href: "/client" },
      { title: "Training", icon: Dumbbell, href: "/client/training" },
      { title: "Cardio", icon: Heart, href: "/client/cardio" },
      { title: "Nutrition", icon: Calendar, href: "/client/nutrition" },
      { title: "Supplements", icon: Pills, href: "/client/supplements" },
    ],
  },
  {
    title: "Progress Tracking",
    items: [
      { title: "Habits", icon: Clock, href: "/client/habits" },
      { title: "Metrics", icon: BarChart3, href: "/client/metrics" },
      { title: "Submissions", icon: ScrollText, href: "/client/submissions" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Messages", icon: MessageSquare, href: "/client/messages" },
      { title: "Community", icon: UsersRound, href: "/client/community" },
      { title: "Resources", icon: FileText, href: "/client/resources" },
      { title: "My Coach", icon: Briefcase, href: "/client/coach" },
    ],
  },
  {
    title: "Account Management",
    items: [
      { title: "Payments", icon: CreditCard, href: "/client/payments" },
      { title: "Settings", icon: Settings, href: "/client/settings" },
      { title: "Switch to Coach", icon: User, href: "/coach" },
      { title: "Log Out", icon: LogOut, href: "/logout" },
    ],
  },
]

