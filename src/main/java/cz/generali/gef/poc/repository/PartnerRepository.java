package cz.generali.gef.poc.repository;

import cz.generali.gef.poc.domain.Partner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Ivan Dolezal(T911552) on 7.1.2015.
 *
 * @Author Ivan Dolezal
 */
@Repository
public interface PartnerRepository extends CrudRepository<Partner, Long> {

}
