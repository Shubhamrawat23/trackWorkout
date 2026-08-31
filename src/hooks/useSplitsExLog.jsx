import supabase from "@/lib/supabaseClient";

const PAGE_SIZE = 10;

// Long Date
function formatFullDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Short Date
function formatShortDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function useSplitsExLog() {
  const getSplitExerciseDates = async (user_id, split_info_id, page = 0, pageSize = PAGE_SIZE) => {
    try {
      if (!user_id || !split_info_id) {
        return {
          data: null,
          error: {
            message: "user_id and split_info_id are required",
            code: "MISSING_PARAMS",
          },
        };
      }

      const from = page * pageSize;
      const to = from + pageSize - 1;

      const {data, error, status, statusText, count} = await supabase
        .from("wkt_logs")
        .select("id, wkt_date", { count: "exact" })
        .eq("user_id", user_id)
        .eq("split_info_id", split_info_id)
        .order("wkt_date", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("getSplitExerciseDates error:", error);
        return {
          data: null,
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          },
          code: status,
          statusText,
        };
      }

      const formatted = (data ?? []).map((row) => ({
        id: row.id,
        wkt_date: row.wkt_date,
        fullDate: formatFullDate(row.wkt_date),
        shortDate: formatShortDate(row.wkt_date)
      }));

      const hasMore = count != null ? to + 1 < count : formatted.length === pageSize;

      return {
        data: formatted,
        error: null,
        code: status,
        statusText,
        page,
        pageSize,
        totalCount: count ?? null,
        hasMore,
      };
    } catch (err) {
      console.error("getSplitExerciseDates unexpected error:", err);
      return {
        data: null,
        error: {
          message: err?.message || "Unexpected error occurred",
          code: "UNEXPECTED_ERROR",
        },
      };
    }
  };

  return { getSplitExerciseDates };
}