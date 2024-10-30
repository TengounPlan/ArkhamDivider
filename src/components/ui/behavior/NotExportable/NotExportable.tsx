// import S from './NotExportable.module.scss';

import { useAppSelector } from "@/hooks/useAppSelector";
import { selectExport } from "@/store/features/app/app";
import { PropsWithChildren } from "react";


export const NotExportable = ({ children }: PropsWithChildren) => {

  const isExport = useAppSelector(selectExport);
  return (
    <>{!isExport && children }</>
  );
}