"use client";

import { PageMeta } from "fwoosh";
import { FaceIcon } from "@radix-ui/react-icons";

import { Text } from "@fwoosh/ui/components/Text";
import {
  Dialog,
  DialogTrigger,
  Heading,
  DialogPopover,
  DialogModal,
} from "@fwoosh/ui/components/Dialog";
import { IconButton } from "@fwoosh/ui/components/IconButton";

export const meta: PageMeta = {
  title: "Components/Dialog",
  component: [Dialog, DialogTrigger, Heading, DialogPopover],
  description:
    "A dialog is an overlay shown above other content in an application.",
};

export const AsPopover = () => {
  return (
    <DialogTrigger>
      <IconButton>
        <FaceIcon />
      </IconButton>
      <DialogPopover>
        <Dialog>
          <Heading slot="title">Help</Heading>
          <Text>For help accessing your account, please contact support.</Text>
        </Dialog>
      </DialogPopover>
    </DialogTrigger>
  );
};

export const AsModal = () => {
  return (
    <DialogTrigger>
      <IconButton>
        <FaceIcon />
      </IconButton>
      <DialogModal size="small">
        <Dialog>
          <Heading slot="title">Help</Heading>
          <Text>For help accessing your account, please contact support.</Text>
        </Dialog>
      </DialogModal>
    </DialogTrigger>
  );
};
