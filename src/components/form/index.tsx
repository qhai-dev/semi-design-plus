"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../../lib/cn";
import { Label } from "../label";

/**
 * Classic shadcn Form API (react-hook-form) rendered with the Semi Design
 * form spec (semi-foundation/form/form.scss + variables.scss):
 * - form item: vertical column with a 4px gap (label → control → message)
 * - label: 14px/20px semibold text-0 (Semi `.semi-form-field-label`)
 * - description: 14px text-2; error message: 14px in --semi-color-danger with
 *   a 4px top margin, replacing any description while present
 * - control: wires id / aria-describedby / aria-invalid so the Semi input
 *   error styles (`validateStatus="error"`) and a11y descriptions work.
 */

const FormFieldContext = React.createContext<{ name: string }>({ name: "" });
const FormItemContext = React.createContext<{ id: string }>({ id: "" });

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

function Form<TFieldValues extends FieldValues = FieldValues>(
  props: React.ComponentProps<typeof FormProvider<TFieldValues>>,
) {
  return <FormProvider data-slot="form" {...props} />;
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller data-slot="form-field" {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("flex flex-col gap-1", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={error ? "" : undefined}
      htmlFor={formItemId}
      className={cn(className)}
      {...props}
    />
  );
}

function FormControl({ render, children, ...props }: useRender.ComponentProps<"div">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        id: formItemId,
        "aria-describedby": error
          ? `${formDescriptionId} ${formMessageId}`
          : `${formDescriptionId}`,
        "aria-invalid": error ? true : undefined,
      },
      props,
    ),
    render: render ?? (React.isValidElement(children) ? children : undefined),
    state: { slot: "form-control" },
  });
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm leading-5 text-text-2", className)}
      {...props}
    />
  );
}

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm leading-5 text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
