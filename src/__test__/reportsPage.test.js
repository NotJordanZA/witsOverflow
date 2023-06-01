import { render, screen } from '@testing-library/react';
import ReportsPage from '../pages/reportsPage';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';
import { getDoc, getDocs, collection, doc, deleteDoc } from 'firebase/firestore';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../firebase-config/firebase', () => ({
    db: {},
  }));
  
jest.mock('firebase/firestore', () => ({
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    deleteDoc: jest.fn(),

}));

jest.mock('../components/QuestionRow', () => {
    return jest.fn(() => null);
});

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('ReportsPage', () => {
    it('renders the title', () => {
      const { getByText } = render(<ReportsPage/>);
      //Check that title is rendered
      expect(getByText('Questions With Active Reports')).toBeInTheDocument();
    });

    it.skip('Renders questions with active reports', () => {
        const reportsList = [
            {
              id: 1,
              answerID: [null],
            },
            {
              id: 2,
              answerID: [null],
            },
        ];

        const questionsList = [
            {
                id: 1,
                title: 'Test Q 1',
                questionBody: 'Test body 1',
                votes: 5,
                answerCount: 2,
                views: 10,
                name: 'student1@students.wits.ac.za',
                reported: false,
              },
              {
                id: 1,
                title: 'Test Q 2',
                questionBody: 'Test body 2',
                votes: 10,
                answerCount: 3,
                views: 15,
                name: 'student2@students.wits.ac.za',
                reported: true,
              },
        ]

        // Mock the implementation of getDocs
        jest.spyOn(window, 'getDocs').mockImplementationOnce(() =>
            Promise.resolve({
            docs: reportsList.map((report) => ({
                id: report.id,
                answerID: report.answerID,
            })),
        })
    );

        // Mock the implementation of getDoc
        jest.spyOn(window, 'getDoc').mockImplementationOnce(() =>
            Promise.resolve({
            data: () => questionsList[0],
            })
        );
        render(<ReportsPage/>);
        expect(screen.getByText("Test Q 1")).toBeInTheDocument();
        expect(screen.getByText("Test Q 2")).toBeInTheDocument();
    })
  });