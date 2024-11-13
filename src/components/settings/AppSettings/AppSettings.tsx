import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { LayoutFilter, LanguageSelect, PrintSettings, Row, IconButton, LayoutZoom, Button, Icon } from '@/components';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { ButtonType } from '@/types/ui';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from '@/store/features/dividers/dividers';
import { detect } from 'detect-browser';
import { useMemo } from 'react';
import { selectExport } from '@/store/features/app/app';


export const AppSettings = () => {
  const { t } = useTranslation();
  const print = () => window.print();
  const { 
    download,
    progress 
  } = useDownloadDividers();
  const isExport = useAppSelector(selectExport);
  const dividers = useAppSelector(selectDividers);

  const isDone = progress.done === progress.total;
  const browser = useMemo(detect, []);
  const isChrome = browser?.name ==='chrome';

  const onDownload = () => {
    if (!isChrome) {
      return;
    }
    download();
  };
  
  return (
    <div className={S.container}>
      <Row wrap className={S.row}>
      <Row wrap className={S.row}>
        <div className={S.languageSelect}>
          <LanguageSelect/>
        </div>
        
        <div className={S.dividerFilter}>
          <LayoutFilter/>
        </div>
        </Row>
        <div className={S.print}>
          <Row wrap className={S.row}>
            <IconButton 
              onClick={print} 
              icon="crop"

              buttonType={ButtonType.SECONDARY}
            >
              TIFF CMYK
            </IconButton>
            <IconButton 
              onClick={print} 
              icon="download"

              buttonType={ButtonType.SECONDARY}
            >
              Laser Cut / Plotter PDF
            </IconButton>
            <div className={S.zoom}>
              <LayoutZoom/>
            </div>
            <div className={S.printSettings}>
              <PrintSettings/>
            </div>
            {dividers.length > 0 && (
              <>
                <IconButton 
                  onClick={onDownload} 
                  buttonType={ButtonType.SECONDARY}
                  icon="download"
                  disabled={!isChrome}
                  title={!isChrome ? 'Your browser is not supported' : ''}
                >
                  PNG {!isDone && (
                    <>{progress.done} / {progress.total}</>
                  )}
                  {isDone && isExport && <Icon icon="hour-glass"/>}
                  {!isChrome && (
                    <Icon icon="chrome"/>
                  )}
                </IconButton>

                <Button 
                  onClick={print} 
                >
                  <Icon icon="printer"/>{t('Print')} /
                  <Icon icon="download"/> PDF
                </Button>
              </>
            )}
          </Row>
        </div>
      </Row>
    </div>
  );
}