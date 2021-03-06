import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '../../components/Container';
import ScrollContainer, { ShowMore } from '../../components/ScrollContainer';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Task from './Task';

import { getToken } from '../../services/auth';
import { getTasksByToken, getUserByToken } from '../../services/api';

export default function TaskListPage() {
  const [userId, setUserId] = useState();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleClick = useCallback(() => history.push('/app/tasks/done'), [
    history,
  ]);

  const handleShowMore = useCallback(() => {
    getTasksByToken(getToken(), false, tasks.number + 1).then(({ data }) =>
      setTasks({ ...data, content: [...tasks.content, ...data.content] })
    );
  }, [tasks]);

  useEffect(() => {
    async function fetchData() {
      const { data: tasks } = await getTasksByToken(getToken());
      const { data: user } = await getUserByToken(getToken());
      setTasks(tasks);
      setUserId(user.id);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Container loading={loading}>
      <Title>Tarefas</Title>

      <ScrollContainer>
        {tasks &&
          tasks.content.map((item) => (
            <Task key={item.id} {...item} userId={userId} />
          ))}

        {tasks && !tasks.last && (
          <ShowMore onClick={handleShowMore}>
            Mostrar mais{' '}
            {tasks.totalElements % tasks.size === 0
              ? tasks.size
              : tasks.totalElements % tasks.size}{' '}
            tarefas
          </ShowMore>
        )}
      </ScrollContainer>

      <Button onClick={handleClick} text="Tarefas concluídas" />
    </Container>
  );
}
