export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: Category[];
  description: string;
  publishedAt: string;
  coverImage?: string;
  content?: string;
}

export interface Category {
  name: string;
  slug: string;
  count?: number;
  id: string;
}

export interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover:
    | null
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string; expiry_time: string } };
  icon:
    | { type: "emoji"; emoji: any }
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string; expiry_time: string } }
    | { type: "custom_emoji"; custom_emoji: any }
    | null;
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true };
  archived: boolean;
  in_trash: boolean;
  properties: {
    Language: {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    abstract: {
      id: string;
      type: string;
      rich_text: Array<{
        type: string;
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    type: {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    featured: {
      id: string;
      type: string;
      checkbox: boolean;
    };
    date: {
      id: string;
      type: string;
      date: {
        start: string;
        end: null | string;
        time_zone: null | string;
      };
    };
    progress: {
      id: string;
      type: string;
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    category: {
      id: string;
      type: string;
      multi_select: Array<{
        id: string;
        name: string;
        color: string;
      }>;
    };
    title: {
      id: string;
      type: string;
      title: Array<{
        type: string;
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
  };
  url: string;
  public_url: string;
}

export interface NotionBlock {
  object: string;
  id: string;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: string;
  paragraph?: {
    rich_text: any[]; // Adjust the type of rich_text if you have a specific structure
    color: string;
  };
}
