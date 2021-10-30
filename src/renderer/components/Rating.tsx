// nice smiley rating

import * as React from 'react';
import MuiRating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <span {...other}>{customIcons[value].icon}</span>;
}

const Rating = ({
  onChange: handleChange,
  value,
}: {
  onChange: (event: React.SyntheticEvent, value: number | null) => void;
  value: number;
}) => {
  return (
    <MuiRating
      name="highlight-selected-only"
      value={value}
      IconContainerComponent={IconContainer}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 40 },
        '& .MuiRating-iconFilled': {
          color: '#1976d2',
        },
      }}
      highlightSelectedOnly
      onChange={handleChange}
    />
  );
};

export default Rating;
