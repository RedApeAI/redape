import mail from "../../assets/icons/mail.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";
import instagram from "../../assets/icons/instagram.svg";
import conference from "../../assets/icons/conference.svg";
import aiChat from "../../assets/icons/ai-chat-01.svg";
import aiCoEditing from "../../assets/icons/ai-co-editing.svg";
import chartRadar from "../../assets/icons/chart-radar.svg";
import security from "../../assets/icons/security.svg";
import folder from "../../assets/icons/folder-03.svg";
import newReleases from "../../assets/icons/new-releases.svg";
import speech from "../../assets/icons/speech.svg";
import inLove from "../../assets/icons/in-love.svg";

export interface NavLeaf {
  label: string;
  description?: string;
  /** Only the lead column of a menu carries icons. */
  icon?: string;
  href: string;
}

export interface NavMenu {
  /** Wider left column — icon, label and description per row. */
  lead: NavLeaf[];
  /** Plain right column, no icons. */
  aside?: { heading: string; items: NavLeaf[] };
}

export interface NavItem {
  label: string;
  href?: string;
  menu?: NavMenu;
}

/**
 * Single source of truth for the navbar, its hover menus and the mobile
 * sheet — all three render from this list so they can't drift apart.
 */
export const navItems: NavItem[] = [
  {
    label: "Integration",
    menu: {
      lead: [
        {
          label: "Email inbox",
          description: "Gmail and Outlook, synced both ways",
          icon: mail,
          href: "#",
        },
        {
          label: "WhatsApp",
          description: "Reach leads where they actually reply",
          icon: whatsapp,
          href: "#",
        },
        {
          label: "Instagram DMs",
          description: "Turn followers into booked calls",
          icon: instagram,
          href: "#",
        },
        {
          label: "Calendar",
          description: "Meetings booked without the back-and-forth",
          icon: conference,
          href: "#",
        },
      ],
      aside: {
        heading: "Also connects to",
        items: [
          { label: "CRM sync", description: "HubSpot, Pipedrive, Salesforce", href: "#" },
          { label: "Slack", description: "Hot-lead alerts in your channel", href: "#" },
          { label: "Spreadsheets", description: "Import and export in one click", href: "#" },
          { label: "Developer API", description: "Webhooks for everything else", href: "#" },
        ],
      },
    },
  },
  {
    label: "Why us",
    menu: {
      lead: [
        {
          label: "AI that chases",
          description: "Follow-ups that never go cold",
          icon: aiChat,
          href: "#",
        },
        {
          label: "Hive knowledge",
          description: "Learns from every reply, week over week",
          icon: aiCoEditing,
          href: "#",
        },
        {
          label: "Pipeline clarity",
          description: "See exactly where the funnel leaks",
          icon: chartRadar,
          href: "#",
        },
        {
          label: "Your data stays yours",
          description: "Encrypted connections, no message mining",
          icon: security,
          href: "#",
        },
      ],
      aside: {
        heading: "Compare",
        items: [
          { label: "RedApe vs. manual outreach", description: "The hours you get back", href: "#" },
          { label: "RedApe vs. sequencers", description: "Why blast tools stall", href: "#" },
          { label: "Customer stories", description: "Teams already running on RedApe", href: "#" },
        ],
      },
    },
  },
  {
    label: "Resources",
    menu: {
      lead: [
        {
          label: "Documentation",
          description: "Set up your first campaign in minutes",
          icon: folder,
          href: "#",
        },
        {
          label: "Changelog",
          description: "What shipped this week",
          icon: newReleases,
          href: "#",
        },
        {
          label: "Blog",
          description: "Outreach playbooks that still work",
          icon: speech,
          href: "#",
        },
        {
          label: "Community",
          description: "Swap tactics with other sales teams",
          icon: inLove,
          href: "#",
        },
      ],
      aside: {
        heading: "Get help",
        items: [
          { label: "Help centre", description: "Answers to the common questions", href: "#" },
          { label: "Talk to sales", description: "See RedApe on your own pipeline", href: "#" },
          { label: "System status", description: "Live uptime for every channel", href: "#" },
        ],
      },
    },
  },
  { label: "About us", href: "#" },
  { label: "Contact us", href: "#" },
];
