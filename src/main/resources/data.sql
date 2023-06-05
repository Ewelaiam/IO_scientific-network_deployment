DO
'
DECLARE
BEGIN
    IF (NOT EXISTS (SELECT * FROM role))
    THEN
        insert into role(id, name) values (100, ''ROLE_ADMIN'');
        insert into role(id, name) values (101, ''Professor'');
        insert into role(id, name) values (102, ''PhD'');
    END IF;

    IF (NOT EXISTS (SELECT * FROM users))
    THEN
        insert into users(id, birth_date, created_at, email, password, role_id, surname, username) values (100, ''1950-07-23'', ''2023-04-16'', ''jola@agh.edu.pl'', ''password'', 102, ''Konieczna'', ''Jolanta'');
        insert into users(id, birth_date, created_at, email, password, role_id, surname, username) values (101, ''1960-03-14'', ''2023-04-16'', ''admin@agh.edu.pl'', ''password'', 100, ''Admin'', ''Admin'');
        insert into users(id, birth_date, created_at, email, password, role_id, surname, username) values (102, ''1977-12-03'', ''2023-04-16'', ''boryczko@agh.edu.pl'', ''password'', 101, ''Boryczko'', ''Krzysztof'');
        insert into users(id, birth_date, created_at, email, password, role_id, surname, username) values (103, ''1960-03-14'', ''2023-04-16'', ''marek@agh.edu.pl'', ''password'', 102, ''Garek'', ''Marek'');
    END IF;

    IF (NOT EXISTS(SELECT * FROM organisation))
    THEN
        insert into organisation(id, is_verified, mail_template, name) values (100, true, ''agh.edu.pl'', ''Agh University of Science and Technology'');
        insert into organisation(id, is_verified, mail_template, name) values (101, true, ''uj.edu.pl'', ''Jagiellonian University'');
        insert into organisation(id, is_verified, mail_template, name) values (102, true, ''pk.edu.pl'', ''Cracow University of Technology'');
    END IF;
    IF (NOT EXISTS(SELECT * FROM users_organisations))
    THEN
        insert into users_organisations(id, user_id, organisation_id, join_date, leave_date) values (200, 100, 100, ''960-03-14'', null);
        insert into users_organisations(id, user_id, organisation_id, join_date, leave_date) values (201, 102, 100, ''960-03-14'', null);
        insert into users_organisations(id, user_id, organisation_id, join_date, leave_date) values (202, 103, 100, ''960-03-14'', null);
        insert into users_organisations(id, user_id, organisation_id, join_date, leave_date) values (203, 101, 101, ''960-03-14'', null);
        insert into users_organisations(id, user_id, organisation_id, join_date, leave_date) values (204, 101, 102, ''960-03-14'', null);

    END IF;
    IF (NOT EXISTS(SELECT * FROM interest))
    THEN
        insert into interest(id, is_verified, name) values (100, true, ''Anatomy'');
        insert into interest(id, is_verified, name) values (101, true, ''Physiology'');
        insert into interest(id, is_verified, name) values (102, true, ''Biochemistry'');
        insert into interest(id, is_verified, name) values (103, true, ''Cell Biology'');
        insert into interest(id, is_verified, name) values (104, true, ''Molecular Biology'');
        insert into interest(id, is_verified, name) values (105, true, ''Chemistry'');
        insert into interest(id, is_verified, name) values (106, true, ''Development'');
        insert into interest(id, is_verified, name) values (107, true, ''Diseases and Disorders'');
        insert into interest(id, is_verified, name) values (108, true, ''Environmenatal Science'');
        insert into interest(id, is_verified, name) values (109, true, ''Ecology'');
        insert into interest(id, is_verified, name) values (110, true, ''Evolution'');
        insert into interest(id, is_verified, name) values (111, true, ''Genetics'');

    END IF;
    IF (NOT EXISTS (SELECT * FROM users_interests))
        THEN
            insert into users_interests(user_id, interests_id) values (100, 100);
            insert into users_interests(user_id, interests_id) values (100, 102);
            insert into users_interests(user_id, interests_id) values (100, 104);
            insert into users_interests(user_id, interests_id) values (101, 105);
            insert into users_interests(user_id, interests_id) values (101, 111);
            insert into users_interests(user_id, interests_id) values (101, 106);
            insert into users_interests(user_id, interests_id) values (102, 102);
            insert into users_interests(user_id, interests_id) values (102, 101);
            insert into users_interests(user_id, interests_id) values (102, 100);
            insert into users_interests(user_id, interests_id) values (103, 100);
            insert into users_interests(user_id, interests_id) values (103, 102);
            insert into users_interests(user_id, interests_id) values (103, 104);
        END IF;
END;
'  LANGUAGE PLPGSQL;