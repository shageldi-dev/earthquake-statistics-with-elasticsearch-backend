import { BadRequestException } from "@nestjs/common";

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function trim(value: string): string {
  return value.trim();
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === "true" || value === "1";
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);
  if (Number.isNaN(newValue)) {
    if (opts.default) {
      newValue = opts.default;
    } else {
      throw new BadRequestException("Invalid number");
    }
  }

  if (opts.min) {
    if (newValue < opts.min) {
      throw new BadRequestException("must be greater than " + opts.min);
    }
  }

  if (opts.max) {
    if (newValue > opts.max) {
      throw new BadRequestException("must be less than " + opts.max);
    }
  }

  return newValue;
}
