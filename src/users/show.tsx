import { SimpleShowLayout, useShowController, Show, Link, Button, useDataProvider, useGetRecordId, ImageField } from 'react-admin';
import TextWithLabelField from '../components/TextWithLabelField';
import Chart from '../components/Chart';
import '../styles/show.scss';
import TextFieldCard from '../components/TextFieldCard';
import UserStatusDropdown from '../components/UserStatusDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import TextCard from '../components/TextCard';

export const UserShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const dateRange = searchParams.get('date-range');
  const { record } = useShowController({
    queryOptions: {
      meta: { dateRange }
    } as any
  });

  const recordId = useGetRecordId();
  const dataProvider = useDataProvider();
  const [shouldFetch, setShouldFetch] = useState(true);

  const { data: games } = useQuery(
    ['users', 'getGameData', { id: recordId }],
    ({ signal }) => dataProvider.getGameData('users', { id: recordId, signal }),
    {
      enabled: shouldFetch,
      onSuccess: () => setShouldFetch(false),
    }
  );

  useEffect(() => {
    setShouldFetch(true);
  }, [recordId, dateRange]);

  const handleDateRangeClick = (dateRange?: string) => {
    const searchParams = new URLSearchParams(location.search);
    if (dateRange === undefined) {
      searchParams.delete('date-range');
    } else {
      if (/d$/.test(dateRange)) {
        const days = parseInt(dateRange.replace('d', ''), 10);
        const end = new Date();
        const start = new Date(end);
        start.setDate(start.getDate() - days);
        searchParams.set('date-range', `${start.toISOString()},${end.toISOString()}`);
      }
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Show>
      <SimpleShowLayout sx={{ padding: 0 }}>
        <div className="user-show-helpers">
          <div className="nav">
            <Link to="/users"><button>사용자 목록</button></Link>
          </div>
          <span className="spacer"></span>
          <div className="date-picker">
            <Button label="전체" onClick={() => handleDateRangeClick()} />
            <Button label="하루" onClick={() => handleDateRangeClick('1d')} />
            <Button label="주간" onClick={() => handleDateRangeClick('7d')} />
          </div>
        </div>

        <div className="user-show-container">

          <div className="user-info-panel">
            <header className="user-header">
              <div className="user-profile">
                { record?.profile && (
                  <ImageField source={`https://assets.testbase.xyz/${record.profile}`}
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="user-note">
                user note
              </div>
            </header>
            <main className="user-main">
              <TextWithLabelField source="name" label="사용자 아이디" />
              <TextWithLabelField source="email" label="이메일" />
              <TextWithLabelField source="status" label="사용자 상태" />
              <TextWithLabelField source="birth" label="생년월일" />
              <TextWithLabelField source="" label="가입날짜" />
              <TextWithLabelField source="" label="휴대번호" />
              <TextWithLabelField source="" label="마지막게임" />
              <TextWithLabelField source="" label="언어" />
              <TextWithLabelField source="" label="KYC 레벨" />
              <TextWithLabelField source="" label="업로드 파일" />
              <TextWithLabelField source="" label="신고" />
              <TextWithLabelField source="country" label="국가" />
              <TextWithLabelField source="" label="IP주소" />
              <TextWithLabelField source="" label="주소" />
            </main>

            <Chart />
          </div> {/* user-info-panel */}

          <div className="game-info-panel">
            <div className="game-data consolidated">
              <h5>종합 데이터</h5>
              <div className="data-cards">
                <TextFieldCard source="" label="밸런스" />
                <TextFieldCard source="" label="입금액" />
                <TextFieldCard source="" label="출금액" />
                { games?.data && (
                  <>
                    <TextCard source="totalProfit" label="수익" gamesData={games.data} />
                    <TextCard source="playtime" label="게임시간" gamesData={games.data} />
                    <TextCard source="handCount" label="핸드수" gamesData={games.data} />
                    <TextCard source="winnings" label="이긴 핸드수 (승률)" gamesData={games.data} />
                    <TextCard source="peakTime" label="피크타임" gamesData={games.data} />
                  </>
                )}
                <TextFieldCard source="" label="기여 레이크" />
                <TextFieldCard source="" label="받은 보너스 총액" />
              </div>
            </div>
            <div className="game-data money-game">
              <h5>캐시게임</h5>
              <div className="data-cards">
                { games?.data && (
                  <TextCard source="totalProfit" label="캐시게임 수익" gamesData={games.data} />
                )}
                <TextFieldCard source="" label="세션당 평균 수익" />
                { games?.data && (
                  <>
                    <TextCard source="avgProfitPer100Hands" label="100핸드당 평균 수익" gamesData={games.data} />
                    <TextCard source="avgProfitPerHour" label="시간당 평균 수익" gamesData={games.data} />
                  </>
                )}
                <TextFieldCard source="" label="세션수" />
                { games?.data && (
                  <>
                    <TextCard source="handCount" label="핸드수" gamesData={games.data} />
                    <TextCard source="avgBetSize" label="평균 벳사이즈" gamesData={games.data} />
                  </>
                )}
              </div>
            </div>
            <div className="game-data tourney-game">
              <h5>토너먼트</h5>
              <div className="data-cards">
                <TextFieldCard source="" label="토너먼트 수익" />
                <TextFieldCard source="" label="토너먼트당 평균 수익" />
                <TextFieldCard source="" label="엔트리당 평균 수익" />
                <TextFieldCard source="" label="우승/머니인" />
                <TextFieldCard source="" label="토너먼트수" />
                <TextFieldCard source="" label="핸드수" />
              </div>
            </div>
            <div className="game-data manage-user">
              <h5>플레이어 조치</h5>
              <div className="actions">
                <div className="action">
                  <label>플레이어 상태변경</label>
                  {record?.id && (
                    <UserStatusDropdown userId={record?.id} source="status" />
                  )}
                </div>
                <div className="action">
                  <label>플레이어 밸런스 환수</label>
                  <button>밸런스 환수하기</button>
                </div>
              </div>
            </div>
          </div> {/* game-info-panel */}

        </div> {/* user-show-container */}
      </SimpleShowLayout>
    </Show>
  )
}