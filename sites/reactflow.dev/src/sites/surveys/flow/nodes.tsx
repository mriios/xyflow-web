import { Button, Heading, HeroIcon, Link, Text, cn } from '@xyflow/xy-ui';
import { Handle, Node, Position } from 'reactflow';

export const nodeTypes = {
  action: ActionNode,
  section: SectionNode,
  project: ProjectNode,
};

export type ActionParams = {
  id?: string;
  position: { x: number; y: number };
  action: () => void;
  content?: React.ReactNode;
};

export const action = ({ id, position, action, content }: ActionParams) => ({
  type: 'action',
  id,
  position,
  data: { content, action },
});

export function ActionNode({ data }) {
  return (
    <Button
      className="nopan nodrag relative bg-primary text-white flex items-center justify-center rounded-full shadow-md"
      onClick={data.action}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {data?.content}
    </Button>
  );
}

export type SectionParams = {
  id?: string;
  isHero?: boolean;
  title?: string;
  content?: React.ReactNode;
  links?: { text: string; href: string }[];
  action?: (() => void) | { text: string; onClick: () => void };
  position: { x: number; y: number };
} & Omit<Node, 'id' | 'type' | 'data' | 'position'>;

export const section = ({
  id,
  isHero,
  title,
  content,
  links,
  action,
  position,
  ...delegated
}: SectionParams) => ({
  id,
  type: 'section',
  data: {
    content: (
      <>
        {title && (
          <Heading
            size={isHero ? 'lg' : 'md'}
            className={cn(
              'relative',
              isHero && 'text-center',
              content && 'mb-12',
            )}
          >
            {isHero && (
              <div
                className="absolute opacity-10 w-[150%] h-[150%] -left-1/3 -top-1/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
                }}
              />
            )}
            {title}
          </Heading>
        )}
        {content}
      </>
    ),
    links: links && (
      <div className="flex gap-4">
        {links.map(({ text, href }, i) => (
          <Link
            className="nodrag nopan"
            key={`${href}-${i}`}
            href={href}
            size="xs"
          >
            {text}
          </Link>
        ))}
      </div>
    ),
    action:
      typeof action === 'function' ? (
        <Button className="nodrag nopan" onClick={action}>
          Next
        </Button>
      ) : typeof action === 'object' ? (
        <Button className="nodrag nopan" onClick={action.onClick}>
          {action.text}
        </Button>
      ) : null,
  },
  position,
  ...delegated,
});

function SectionNode({ data }) {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md max-w-lg flex flex-col gap-4">
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {data?.content}
      {(data?.links || data?.action) && (
        <div className="flex gap-4 justify-between items-center justify-items-end">
          {data?.links ?? <div />}
          {data?.action}
        </div>
      )}
    </div>
  );
}

export type ProjectParams = {
  id?: string;
  isCategory?: boolean;
  label: string;
  position: { x: number; y: number };
} & Omit<Node, 'id' | 'type' | 'data' | 'position'>;

export const project = ({
  id,
  isCategory,
  label,
  position,
  ...delegated
}: ProjectParams) => ({
  id,
  type: 'project',
  hidden: true,
  data: { isCategory, label },
  position,
  ...delegated,
});

function ProjectNode({ data }) {
  return (
    <div
      className={cn(
        'relative bg-white p-4 rounded-lg shadow-md max-w-md',
        data?.isCategory && 'bg-primary text-white',
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Text size={data?.isCategory ? 'sm' : 'xs'}>{data?.label}</Text>
    </div>
  );
}
