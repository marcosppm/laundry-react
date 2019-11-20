import * as React from 'react';
import { ResidenceComponent } from './residence-view.component';
import { Residence } from '../../model/entities';

interface ResidenceContainerProps {
  residence: Residence;
}

export const ResidenceContainer = (props: ResidenceContainerProps) => {
  return (
    <ResidenceComponent residence={props.residence} />
  );
}
