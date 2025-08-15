import { Schema, model, type Document } from "mongoose";

export interface AvailableHour {
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  open: string; // HH:mm
  close: string; // HH:mm
}

export interface CostRange {
  min: number;
  max: number;
}

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface Barbershop extends Document {
  name: string;
  geo: GeoPoint;
  costRange: CostRange;
  availableHours: AvailableHour[];
  ownerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const availableHourSchema = new Schema<AvailableHour>(
  {
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    open: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{2}:\d{2}$/.test(v),
        message: "open must be in HH:mm format",
      },
    },
    close: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{2}:\d{2}$/.test(v),
        message: "close must be in HH:mm format",
      },
    },
  },
  { _id: false }
);

const barbershopSchema = new Schema<Barbershop>(
  {
    name: { type: String, required: true, trim: true },
    geo: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (arr: number[]) => Array.isArray(arr) && arr.length === 2,
          message: "geo.coordinates must be [lng, lat]",
        },
      },
    },
    costRange: {
      min: { type: Number, required: true, min: 0 },
      max: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: function (this: CostRange, v: number) {
            return typeof v === "number" && v >= (this as any).min;
          },
          message: "costRange.max must be >= costRange.min",
        },
      },
    },
    availableHours: { type: [availableHourSchema], default: [] },
    ownerId: { type: String, default: null },
  },
  { timestamps: true }
);

barbershopSchema.index({ geo: "2dsphere" });

export const BarbershopModel = model<Barbershop>("Barbershop", barbershopSchema);
