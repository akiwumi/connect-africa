import { useState } from "react";

type TimeSlot = {
  date: string;
  time: string;
  label: string;
  dateTime: Date;
};

type CalendarProps = {
  slots: TimeSlot[];
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
};

export function Calendar({ slots, selectedSlot, onSelectSlot }: CalendarProps) {
  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const dates = Object.keys(slotsByDate).sort();
  const [selectedDate, setSelectedDate] = useState<string>(
    dates[0] || ""
  );

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const formatDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getSlotKey = (date: string, time: string) => `${date}T${time}`;

  return (
    <div className="calendar-container" style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
      {/* Date Navigation */}
      <div
        className="calendar-date-navigation"
        style={{
          display: "flex",
          gap: "var(--ds-space-2)",
          marginBottom: "var(--ds-space-4)",
          overflowX: "auto",
          paddingBottom: "var(--ds-space-2)",
          width: "100%",
          boxSizing: "border-box",
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            onClick={() => setSelectedDate(date)}
            style={{
              padding: "var(--ds-space-3) var(--ds-space-4)",
              background: selectedDate === date ? "var(--ds-primary)" : "var(--ds-surface)",
              color: selectedDate === date ? "var(--ds-text-inverse)" : "var(--ds-text)",
              border: `1px solid ${selectedDate === date ? "var(--ds-primary)" : "var(--ds-border)"}`,
              borderRadius: "var(--ds-radius-md)",
              cursor: "pointer",
              fontSize: "var(--ds-text-sm)",
              fontWeight: selectedDate === date ? 600 : 400,
              whiteSpace: "nowrap",
              transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
              minWidth: "120px"
            }}
          >
            <div style={{ display: "block", fontSize: "var(--ds-text-xs)", opacity: 0.9 }}>
              {formatDayOfWeek(date).slice(0, 3)}
            </div>
            <div style={{ display: "block", fontWeight: 600 }}>
              {new Date(date + "T00:00:00").toLocaleDateString("en-US", { day: "numeric", month: "short" })}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Date Header */}
      {selectedDate && (
        <div
          style={{
            marginBottom: "var(--ds-space-4)",
            padding: "var(--ds-space-3)",
            background: "var(--ds-surface-2)",
            borderRadius: "var(--ds-radius-sm)",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "var(--ds-text-md)",
              fontWeight: 600,
              margin: 0,
              color: "var(--ds-text)"
            }}
          >
            {formatDateHeader(selectedDate)}
          </h3>
          <p
            style={{
              fontSize: "var(--ds-text-xs)",
              color: "var(--ds-text-muted)",
              margin: "var(--ds-space-1) 0 0"
            }}
          >
            Select a time slot (All times in your local timezone)
          </p>
        </div>
      )}

      {/* Time Slots Grid */}
      {selectedDate && slotsByDate[selectedDate] && (
        <div
          className="calendar-time-slots"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: "var(--ds-space-2)",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box"
          }}
        >
          {slotsByDate[selectedDate]
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((slot) => {
              const slotKey = getSlotKey(slot.date, slot.time);
              const isSelected = selectedSlot === slotKey;
              const timeLabel = slot.time;

              return (
                <button
                  key={slotKey}
                  type="button"
                  onClick={() => onSelectSlot(slotKey)}
                  style={{
                    padding: "var(--ds-space-3)",
                    background: isSelected ? "var(--ds-primary)" : "var(--ds-surface)",
                    color: isSelected ? "var(--ds-text-inverse)" : "var(--ds-text)",
                    border: `2px solid ${isSelected ? "var(--ds-primary)" : "var(--ds-border)"}`,
                    borderRadius: "var(--ds-radius-md)",
                    cursor: "pointer",
                    fontSize: "var(--ds-text-sm)",
                    fontWeight: isSelected ? 600 : 400,
                    transition: "all var(--ds-dur-2) var(--ds-ease-standard)",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--ds-primary-soft)";
                      e.currentTarget.style.borderColor = "var(--ds-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--ds-surface)";
                      e.currentTarget.style.borderColor = "var(--ds-border)";
                    }
                  }}
                >
                  {timeLabel}
                  {isSelected && (
                    <span
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        fontSize: "10px"
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      )}

      {selectedDate && (!slotsByDate[selectedDate] || slotsByDate[selectedDate].length === 0) && (
        <p
          style={{
            textAlign: "center",
            color: "var(--ds-text-muted)",
            padding: "var(--ds-space-6)",
            fontSize: "var(--ds-text-sm)"
          }}
        >
          No available slots for this date
        </p>
      )}
    </div>
  );
}

