import type { ReactNode } from "react";

export function ListItem({
  left,
  title,
  meta,
  right
}: {
  left?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="ds-list-item">
      <div>{left}</div>
      <div style={{ display: "grid", gap: 2 }}>
        <div className="ds-list-title">{title}</div>
        {meta ? <div className="ds-list-meta">{meta}</div> : null}
      </div>
      <div>{right}</div>
    </div>
  );
}


