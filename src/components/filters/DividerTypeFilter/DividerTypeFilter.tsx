import Select from 'react-select';
import classNames from 'classnames';

import S from './DividerTypeFilter.module.scss';

import icon from './images/change-orientation.svg';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectType, setLayout, setType } from '@/store/features/layout/layout';
import { IDividerType } from '@/types/dividers';
import { getLayoutById, getLayoutsByType } from '@/util/layouts';
import { Color, ColorSelect } from '@/components';
import { selectColor, setColor } from '@/store/features/dividers/dividers';
import { layouts } from '@/data/layouts';
import { whereEquals } from '@/util/common';

export type DividerTypeFilterProps = {

}

export const DividerTypeFilter = ({}: DividerTypeFilterProps) => {
  const dispatch = useAppDispatch();
  const dividerType = useAppSelector(selectType);
  const layout = useAppSelector(selectLayout);
  const useColor = useAppSelector(selectColor);

  const isVertical = dividerType === IDividerType.VERTICAL;

  const iconClassName = classNames(
    S.icon,
    isVertical && S.icon_vertical
  );

  const toggleType = () => {
    const nextType = dividerType === IDividerType.HORIZONTAL ? 
      IDividerType.VERTICAL : 
      IDividerType.HORIZONTAL;
    
    const criteria = {
      color: useColor,
      type: nextType
    }

    const [firstLayout] = layouts.filter(whereEquals(criteria));
    dispatch(setType(nextType));
    dispatch(setLayout(firstLayout));
  };

  const criteria = {
    color: useColor,
    type: layout?.type 
  }

  const options = layouts.filter(whereEquals(criteria))
    .map(({ title, id }) => ({
      label: title,
      value: id
    }));

  const value = layout ? options.find(({ value }) => value === layout.id) : null;

  const changeDividerType = (id: string) => {
    const layout = getLayoutById(id);

    dispatch(setLayout(layout));
  }

  const toggleColor = () => {
    const nextColor = !useColor;

    const criteria = {
      color: nextColor,
      type: layout?.type
    }

    const [firstLayout] = layouts.filter(whereEquals(criteria));
    dispatch(setColor(nextColor));
    dispatch(setLayout(firstLayout));
  };

  return (
    <div className={S.container}>
      <Color className={S.color} color={useColor ? 'rgb(225 173 36)' : 'black'} onClick={toggleColor}/>
      <img className={iconClassName} src={icon} alt="Change Type" onClick={toggleType}/>
      {options.length > 1 && (
        <Select 
          className={S.select} 
          placeholder="Select type..." 
          value={value} 
          options={options}
          onChange={item => item && changeDividerType(item.value)}
        />
      )}
    </div>
  );
}