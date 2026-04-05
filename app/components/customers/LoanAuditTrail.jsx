"use client";

import { formatDate, formatTimeToAMPM } from "@/helpers";
import { getLoanAuditTrail } from "@/redux/slices/loanAuditTrailSlice";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const sourceDotClass = {
  audit: "bg-emerald-600",
  application_log: "bg-blue-600",
  ledger: "bg-amber-600",
};

function performerLabel(performedBy) {
  if (!performedBy) return "System";
  const name = `${performedBy.firstName || ""} ${performedBy.lastName || ""}`.trim();
  return name || performedBy.email || "User";
}

const LoanAuditTrail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trail = useSelector((state) => state.loanAuditTrail);
  const [page, setPage] = useState(1);
  const perPage = 25;

  const load = useCallback(() => {
    dispatch(getLoanAuditTrail({ loanId: id, page, per_page: perPage }));
  }, [dispatch, id, page]);

  useEffect(() => {
    load();
  }, [load]);

  const payload = trail?.data?.data;
  const items = payload?.items || [];
  const totalPages = Math.max(1, payload?.totalPages || 1);

  if (trail.loading === "pending" && !items.length) {
    return (
      <p className="text-sm text-gray-500 py-8 text-center">Loading audit trail…</p>
    );
  }

  if (trail.error) {
    return <p className="text-sm text-red-600 py-4">{trail.error}</p>;
  }

  return (
    <main>
      <p className="text-xs text-gray-500 mb-4">
        Unified timeline: dedicated audit events, loan change logs, and ledger
        transactions (newest first).
      </p>
      <div>
        {items.map((item, index) => (
          <div className="flex" key={`${item.source}-${item.id}-${index}`}>
            <div className="flex gap-2 py-3 w-full">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`p-1 rounded-full ${
                    sourceDotClass[item.source] || "bg-gray-500"
                  }`}
                />
                {index < items.length - 1 ? (
                  <div className="flex-1 min-h-[1.5rem] w-[0.6rem] border-2 border-gray-300 mt-1 ml-[0.35rem] border-r-0 border-t-0 rounded-bl-md" />
                ) : null}
              </div>
              <div className="w-full pb-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 -mt-1">
                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {String(item.source || "").replace(/_/g, " ")}
                  </span>
                  {item.eventCategory ? (
                    <span className="text-[10px] text-gray-500">
                      {item.eventCategory}
                    </span>
                  ) : null}
                </div>
                <p className="font-semibold text-sm text-gray-900 mt-1">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="text-xs text-gray-600 mt-0.5 whitespace-pre-wrap break-words">
                    {item.description}
                  </p>
                ) : null}
                <p className="text-xs text-gray-500 mt-2">
                  {performerLabel(item.performedBy)} ·{" "}
                  {item.occurredAt
                    ? formatDate(String(item.occurredAt).slice(0, 10))
                    : "—"}{" "}
                  {item.occurredAt ? formatTimeToAMPM(item.occurredAt) : ""}
                </p>
                {item.source === "audit" &&
                item.metadata &&
                Object.keys(item.metadata).length > 0 ? (
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer text-swBlue">Details</summary>
                    <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto max-h-40 text-[10px]">
                      {JSON.stringify(item.metadata, null, 2)}
                    </pre>
                  </details>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && trail.loading === "succeeded" ? (
        <p className="text-sm text-gray-500 py-6 text-center">No events yet.</p>
      ) : null}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <button
          type="button"
          disabled={page <= 1 || trail.loading === "pending"}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages || trail.loading === "pending"}
          onClick={() => setPage((p) => p + 1)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default LoanAuditTrail;
