"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiAlertTriangle, FiImage, FiRefreshCw, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

import LoadingSpinner from "./LoadingSpinner";
import ResultCard from "./ResultCard";
import { EASE } from "./Reveal";

const ANALYZE_URL =
  process.env.NEXT_PUBLIC_BIOSORT_API_URL ?? "https://api-biosort.onrender.com/analyze";

const MAX_BYTES = 8 * 1024 * 1024;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Object URLs must be released or the tab leaks the image data.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const acceptFile = (candidate) => {
    if (!candidate) return;

    if (!candidate.type.startsWith("image/")) {
      setError("That file is not an image. Upload a JPG, PNG or WebP photo.");
      return;
    }
    if (candidate.size > MAX_BYTES) {
      setError(`That image is ${formatBytes(candidate.size)}. The limit is 8 MB.`);
      return;
    }

    setError(null);
    setResult(null);
    setFile(candidate);
    setPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(candidate);
    });
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!file || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("data", file);

      const response = await fetch(ANALYZE_URL, { method: "POST", body: formData });
      if (!response.ok) {
        throw new Error(`The classification service responded with ${response.status}.`);
      }

      setResult(await response.json());
    } catch (caught) {
      setError(
        caught instanceof Error
          ? `${caught.message} The service may be waking up — please try again in a moment.`
          : "Could not reach the classification service. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAnalyze();
        }}
        className="panel edge-lit rounded-3xl p-6 sm:p-9"
      >
        {/* Drop zone */}
        <motion.div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            acceptFile(event.dataTransfer.files?.[0]);
          }}
          animate={{
            borderColor: dragging ? "#2dd4bf" : "#24313f",
            backgroundColor: dragging ? "rgba(45,212,191,0.06)" : "rgba(255,255,255,0.015)",
          }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center"
        >
          {previewUrl ? (
            <div className="flex w-full flex-col items-center">
              <motion.img
                key={previewUrl}
                src={previewUrl}
                alt="Selected biomedical waste item"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="max-h-64 w-auto rounded-xl border border-hairline object-contain"
              />
              <div className="mt-4 flex items-center gap-3">
                <p className="max-w-[16rem] truncate text-xs text-ink-soft">{file?.name}</p>
                <span className="text-[10px] text-ink-faint">{formatBytes(file?.size ?? 0)}</span>
                <button
                  type="button"
                  onClick={clearFile}
                  className="btn btn-ghost btn-md px-2 py-1"
                  aria-label="Remove image"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline-2 bg-mint/10 text-mint">
                <FiUploadCloud className="text-2xl" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-medium text-ink">
                Drop a photo of the waste item here
              </p>
              <p className="mt-1.5 text-xs text-ink-faint">
                JPG, PNG or WebP · up to 8 MB · nothing is stored
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn btn-outline btn-md mt-6"
              >
                <FiImage className="text-sm" />
                Choose an image
              </button>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => acceptFile(event.target.files?.[0])}
          />
        </motion.div>

        {error && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-2xl border border-coral/30 bg-coral/[0.08] p-4"
          >
            <FiAlertTriangle className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
            <p className="text-[13px] leading-relaxed text-ink-soft">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.button
            type="submit"
            disabled={!file || loading}
            whileHover={!file || loading ? undefined : { y: -2 }}
            whileTap={!file || loading ? undefined : { scale: 0.985 }}
            className="btn btn-primary btn-lg flex-1"
          >
            {loading ? (
              <>
                <FiRefreshCw className="animate-spin text-base" />
                Analysing…
              </>
            ) : (
              <>
                <FiTrash2 className="text-base" />
                Classify this item
              </>
            )}
          </motion.button>

          {file && !loading && (
            <button type="button" onClick={clearFile} className="btn btn-outline btn-lg sm:w-auto">
              <FiX className="text-sm" />
              Clear
            </button>
          )}
        </div>
      </form>

      {loading && <LoadingSpinner />}

      <ResultCard result={result} onClose={() => setResult(null)} />
    </div>
  );
}
